const tape = require('tape')
const fs = require('fs')
const Hypervisor = require('primea-hypervisor')
const Message = require('primea-message')
const WasmContainer = require('primea-wasm-container')
const SystemInterface = require('../index.js')
const testInterface = require('./testInterface.js')

const level = require('level')
const RadixTree = require('dfinity-radix-tree')
const db = level('./testdb')

const tree = new RadixTree({
  db: db
})

tape('create message', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/createMessage.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm])
  }))
})

tape('create channel', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/createChannel.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm])
  }))
})

tape('adding a port to a message', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/addPort.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm])
  }))
})

tape('message data length', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/messageLen.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm])
  }))
})

tape('getting a messages port', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/getMessagesPort.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const ports = hypervisor.createChannel()

  const port = hypervisor.creationService.getPort()
  await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: ports
  }))
})

tape('port binding', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/bindPort.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const ports = hypervisor.createChannel()

  const port = hypervisor.creationService.getPort()
  const instance = await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
  t.equals(Object.keys(instance.ports.ports).length, 1)
})

tape('get port', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/getPort.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const ports = hypervisor.createChannel()
  const port = hypervisor.creationService.getPort()
  const instance = await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
  t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

  const message2 = new Message()
  await instance.message(message2)
})

tape('delete port', async t => {
  t.plan(3)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/deletePort.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  const ports = hypervisor.createChannel()
  const instance = await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
  t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

  const message2 = new Message()
  await instance.message(message2)
  t.equals(Object.keys(instance.ports.ports).length, 0, 'should delete port')
  t.equals(ports[0].messages.length, 1, 'should have delete message')
})

tape('port unbinding', async t => {
  t.plan(3)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/unbindPort.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  const ports = hypervisor.createChannel()
  const instance = await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
  t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

  const message2 = new Message()
  await instance.message(message2)
  t.equals(Object.keys(instance.ports.ports).length, 0, 'should unbind port')
})

tape('reading message data', async t => {
  // t.plan(3)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/readMessageData.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  const ports = hypervisor.createChannel()
  const instance = await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
  t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

  const message2 = new Message({
    data: new Uint8Array([1, 2, 3, 4, 5])
  })
  await instance.message(message2)
  t.end()
})

tape('send messages', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/sendingMessages.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  const ports = hypervisor.createChannel()
  const instance = await hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
  t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

  const message2 = new Message()
  await instance.message(message2)
  t.equals(ports[0].messages.length, 1, 'should have message')
})

tape('referance map', async t => {
  t.plan(4)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/referances.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const port = hypervisor.creationService.getPort()
  const ports = hypervisor.createChannel()
  hypervisor.send(port, new Message({
    data: Buffer.concat([Buffer.from([0]), Buffer.from([WasmContainer.typeId]), wasm]),
    ports: [ports[1]]
  }))
})
