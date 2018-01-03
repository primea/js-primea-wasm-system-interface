const Message = require('primea-message')
const Cap = require('primea-capability')
const WasmContainer = require('primea-wasm-container')
const Store = require('./store.js')

const RadixTree = require('dfinity-radix-tree')

const STOAGEKEY = [1, 0]

module.exports = class SystemInterface {
  constructor (wasmContainer) {
    this.wasmContainer = wasmContainer
    this.actor = wasmContainer.actor
    this.referanceMap = wasmContainer.referanceMap
  }

  deleteStore (storeRef) {
    const store = this.wasmContainer.referanceMap.get(storeRef, Store)
    store.delete()
    this.wasmContainer.referanceMap.delete(storeRef)
  }

  updateStore (storeRef, messageRef) {
    const message = this.wasmContainer.referanceMap.get(messageRef, Message)
    const store = this.wasmContainer.referanceMap.get(storeRef, Store)
    store.update(message)
  }

  async openStore (offset, len, cb) {
    let key = this.wasmContainer.getMemory(offset, len)
    const json = new RadixTree.ArrayConstructor(key).toJSON()
    key = new RadixTree.ArrayConstructor(STOAGEKEY.concat(json))
    const promise = this.actor.state.get(key)
    await this.wasmContainer.pushOpsQueue(promise)
    let message = await promise
    let error = 0
    if (!message) {
      error = -1
      message = new Message()
    }
    const messageRef = this.wasmContainer.referanceMap.add(message)
    const store = new Store(key, this.actor.state)
    const storeRef = this.wasmContainer.referanceMap.add(store)
    this.wasmContainer.execute(cb, storeRef, messageRef, error)
  }

  createMessage (offset, len) {
    const data = this.wasmContainer.getMemory(offset, len)
    const message = new Message({
      data: data
    })
    return this.wasmContainer.referanceMap.add(message)
  }

  messageDataLen (messageRef) {
    const message = this.referanceMap.get(messageRef, Message)
    return message.data.length
  }

  loadMessageData (messageRef, writeOffset, readOffset, len) {
    const message = this.referanceMap.get(messageRef, Message)
    const data = message.data.slice(readOffset, len)
    this.wasmContainer.setMemory(writeOffset, data)
  }

  addCapToMessage (messageRef, capRef) {
    const message = this.referanceMap.get(messageRef, Message)
    const cap = this.referanceMap.get(capRef)
    message.caps.push(cap)
  }

  messageCapLen (messageRef) {
    const message = this.referanceMap.get(messageRef, Message)
    return message.caps.length
  }

  loadMessageCap (messageRef, index) {
    const message = this.referanceMap.get(messageRef, Message)
    const cap = message.caps[index]
    if (!cap) {
      throw new Error('no capability at this index')
    }
    return this.referanceMap.add(cap)
  }

  getMessageTag (messageRef) {
    const message = this.referanceMap.get(messageRef, Message)
    return message.tag
  }

  sendMessage (capRef, messageRef) {
    const cap = this.referanceMap.get(capRef, Cap)
    const message = this.referanceMap.get(messageRef, Message)
    this.actor.send(cap, message)
  }

  createActor (messageRef, cb) {
    const message = this.referanceMap.get(messageRef, Message)
    this.actor.createActor(WasmContainer.typeId, message)
  }

  async getNextMessage (timeout, cb) {
    const promise = this.actor.inbox.nextMessage(timeout)
    await this.wasmContainer.pushOpsQueue(promise)
    const message = await promise

    if (message) {
      const messageRef = this.wasmContainer.referanceMap.add(message)
      this.wasmContainer.instance.exports.onMessage(messageRef)
    } else {
      this.wasmContainer.execute(cb)
    }
  }

  mintCap (tag) {
    const cap = this.actor.mintCap(tag)
    return this.wasmContainer.referanceMap.add(cap)
  }

  deleteRef (ref) {
    this.referanceMap.delete(ref)
  }

  isValidRef (ref) {
    return this.referanceMap.has(ref)
  }
}
