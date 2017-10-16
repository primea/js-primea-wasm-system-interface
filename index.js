module.exports = class SystemInterface {
  constructor (wasmContainer) {
    this.wasmContainer = wasmContainer
    this.kernel = wasmContainer.kernel
    this.ports = this.kernel.ports
    this.referanceMap = wasmContainer.referanceMap
  }

  createMessage (offset, len) {
    const data = this.wasmContainer.getMemory(offset, len)
    const message = this.kernel.createMessage({data: data})
    return this.wasmContainer.referanceMap.add(message)
  }

  createChannel (locA, locB) {
    const [portA, portB] = this.kernel.ports.createChannel()

    const refA = this.wasmContainer.referanceMap.add(portA)
    this.wasmContainer.setMemory(locA, [refA])

    const refB = this.wasmContainer.referanceMap.add(portB)
    this.wasmContainer.setMemory(locB, [refB])
  }

  bindPort (offset, length, portRef) {
    const port = this.wasmContainer.referanceMap.get(portRef)
    let name = this.wasmContainer.getMemory(offset, length)
    name = Buffer.from(name).toString()
    const promise = this.kernel.ports.bind(name, port)
    this.wasmContainer.pushOpsQueue(promise)
  }

  unbindPort (offset, length) {
    let name = this.wasmContainer.getMemory(offset, length)
    name = Buffer.from(name).toString()
    const port = this.kernel.ports.get(name)
    const promise = this.kernel.ports.unbind(name)
    this.wasmContainer.pushOpsQueue(promise)
    return this.wasmContainer.referanceMap.add(port)
  }

  getPort (offset, length) {
    let name = this.wasmContainer.getMemory(offset, length)
    name = Buffer.from(name).toString()
    const port = this.kernel.ports.get(name)
    return this.wasmContainer.referanceMap.add(port)
  }

  deletePort (offset, length) {
    let name = this.wasmContainer.getMemory(offset, length)
    name = Buffer.from(name).toString()
    const promise = this.kernel.ports.delete(name)
    this.wasmContainer.pushOpsQueue(promise)
  }

  getMessageDataLen (messageRef) {
    const message = this.referanceMap.get(messageRef)
    return message.data.length
  }

  loadMessageData (messageRef, writeOffset, readOffset, len) {
    const message = this.referanceMap.get(messageRef)
    const data = message.data.slice(readOffset, len)
    this.wasmContainer.setMemory(writeOffset, data)
  }

  addPortToMessage (messageRef, portRef) {
    const message = this.referanceMap.get(messageRef)
    const port = this.referanceMap.get(portRef)
    message.ports.push(port)
  }

  messagePortLen (messageRef) {
    const message = this.referanceMap.get(messageRef)
    return message.ports.length
  }

  loadMessagePort (messageRef, index) {
    const message = this.referanceMap.get(messageRef)
    const port = message.ports[index]
    return this.referanceMap.add(port)
  }

  sendMessage (portRef, messageRef) {
    const port = this.referanceMap.get(portRef)
    const message = this.referanceMap.get(messageRef)
    this.kernel.send(port, message)
  }

  deleteRef (ref) {
    this.referanceMap.delete(ref)
  }

  isValidRef (ref) {
    return this.referanceMap.has(ref)
  }
}
