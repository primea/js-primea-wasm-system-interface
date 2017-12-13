const Message = require('primea-message')

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
    const message = this.wasmContainer.referanceMap.get(messageRef)
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

  respondToMessage (messageRef, responseRef) {
    const message = this.referanceMap.get(messageRef)
    const response = this.referanceMap.get(responseRef)
    const cap = message.responseCap
    delete message.responseCap
    this.actor.send(cap, response)
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
