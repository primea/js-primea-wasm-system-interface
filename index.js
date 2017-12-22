const Message = require('primea-message')
const Cap = require('primea-capability')
const WasmContainer = require('primea-wasm-container')

module.exports = class SystemInterface {
  constructor (wasmContainer) {
    this.wasmContainer = wasmContainer
    this.actor = wasmContainer.actor
    this.referanceMap = wasmContainer.referanceMap
  }

  createMessage (offset, len) {
    const data = this.wasmContainer.getMemory(offset, len)
    const message = new Message({
      data: data
    })
    return this.wasmContainer.referanceMap.add(message)
  }

  mintCap (tag) {
    const cap = this.actor.mintCap(tag)
    return this.wasmContainer.referanceMap.add(cap)
  }

  storeMessage (index, messageRef) {
    const message = this.wasmContainer.referanceMap.get(messageRef, Message)
    let key = Buffer.alloc(5)
    key.writeUInt32LE(index, 1)
    this.actor.state.set(key, message)
  }

  deleteMessage (index) {
    let key = Buffer.alloc(5)
    key.writeUInt32LE(index, 1)
    this.actor.state.delete(key)
  }

  async loadMessage (index, cb) {
    let key = Buffer.alloc(5)
    key.writeUInt32LE(index, 1)
    const promise = this.actor.state.get(key)
    await this.wasmContainer.pushOpsQueue(promise)
    const message = await promise
    const messageRef = this.wasmContainer.referanceMap.add(message)
    this.wasmContainer.execute(cb, messageRef)
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

  deleteRef (ref) {
    this.referanceMap.delete(ref)
  }

  isValidRef (ref) {
    return this.referanceMap.has(ref)
  }
}
