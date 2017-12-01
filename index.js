const Message = require('primea-message')

module.exports = class SystemInterface {
  constructor (wasmContainer) {
    this.wasmContainer = wasmContainer
    this.actor = wasmContainer.actor
    this.referanceMap = wasmContainer.referanceMap
    this.store = this.actor.hypervisor.tree
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

  storeCap (index, capRef) {
    const cap = this.wasmContainer.referanceMap.get(capRef)
    this.actor.caps.store(index, cap)
  }

  deleteCap (index) {
    this.actor.caps.delete(index)
  }

  loadCap (index, cb) {
    const cap = this.actor.caps.load(index)
    const capRef = this.wasmContainer.referanceMap.add(cap)
    this.wasmContainer.execute(cb, capRef)
  }

  storeData (index, messageRef) {
    const message = this.wasmContainer.referanceMap.get(messageRef)
    let key = Buffer.alloc(4)
    key.writeUInt32LE(index)
    key = Buffer.concat([this.actor.id, key])
    this.store.set(key, message.data)
  }

  deleteData (index) {
    let key = Buffer.alloc(4)
    key.writeUInt32LE(index)
    key = Buffer.concat([this.actor.id, key])
    this.store.delete(key)
  }

  async loadData (index, cb) {
    let key = Buffer.alloc(4)
    key.writeUInt32LE(index)
    key = Buffer.concat([this.actor.id, key])
    const promise = this.store.get(key)
    await this.wasmContainer.pushOpsQueue(promise)
    const value = await promise
    const message = new Message({
      data: value.value
    })
    const messageRef = this.wasmContainer.referanceMap.add(message)
    this.wasmContainer.execute(cb, messageRef)
  }

  messageDataLen (messageRef) {
    const message = this.referanceMap.get(messageRef)
    return message.data.length
  }

  loadMessageData (messageRef, writeOffset, readOffset, len) {
    const message = this.referanceMap.get(messageRef)
    const data = message.data.slice(readOffset, len)
    this.wasmContainer.setMemory(writeOffset, data)
  }

  addCapToMessage (messageRef, capRef) {
    const message = this.referanceMap.get(messageRef)
    const cap = this.referanceMap.get(capRef)
    message.caps.push(cap)
  }

  messageCapLen (messageRef) {
    const message = this.referanceMap.get(messageRef)
    return message.caps.length
  }

  loadMessageCap (messageRef, index) {
    const message = this.referanceMap.get(messageRef)
    const caps = message.caps[index]
    // TODO: check if cap exists
    delete message.caps[index]
    return this.referanceMap.add(caps)
  }

  sendMessage (capRef, messageRef) {
    const cap = this.referanceMap.get(capRef)
    const message = this.referanceMap.get(messageRef)
    this.actor.send(cap, message)
  }

  deleteRef (ref) {
    this.referanceMap.delete(ref)
  }

  isValidRef (ref) {
    return this.referanceMap.has(ref)
  }
}
