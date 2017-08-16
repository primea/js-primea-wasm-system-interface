const tape = require('tape')
const IPFS = require('ipfs')
const fs = require('fs')
const Hypervisor = require('primea-hypervisor')
const Message = require('primea-message')
const WasmContainer = require('primea-wasm-container')
const SystemInterface = require('../index.js')
const testInterface = require('./testInterface.js')

const node = new IPFS({
  start: false
})

node.on('ready', () => {
  tape('create message', async t => {
    t.plan(1)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/createMessage.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })
    await hypervisor.createInstance(WasmContainer.typeId, new Message({data: wasm}))
    t.end()
  })

  tape('create channel', async t => {
    t.plan(2)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/createChannel.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })
    await hypervisor.createInstance(WasmContainer.typeId, new Message({data: wasm}))
  })

  tape('adding a port to a message', async t => {
    t.plan(2)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/addPort.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })
    const message = new Message({data: wasm})
    await hypervisor.createInstance(WasmContainer.typeId, message)
  })

  tape('message data length', async t => {
    t.plan(2)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/messageLen.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })
    const message = new Message({data: wasm})
    await hypervisor.createInstance(WasmContainer.typeId, message)
  })

  tape('getting a messages port', async t => {
    t.plan(2)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/getMessagesPort.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({
      data: wasm,
      ports: ports
    })
    await hypervisor.createInstance(WasmContainer.typeId, message)
  })

  tape('port binding', async t => {
    t.plan(1)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/bindPort.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({data: wasm, ports: [ports[1]]})
    const instance = await hypervisor.createInstance(WasmContainer.typeId, message)
    t.equals(Object.keys(instance.ports.ports).length, 1)
  })

  tape('get port', async t => {
    t.plan(2)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/getPort.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({
      data: wasm,
      ports: [ports[1]]
    })
    const instance = await hypervisor.createInstance(WasmContainer.typeId, message)
    t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

    const message2 = new Message()
    await instance.message(message2)
  })

  tape('delete port', async t => {
    t.plan(3)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/deletePort.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({
      data: wasm,
      ports: [ports[1]]
    })
    const instance = await hypervisor.createInstance(WasmContainer.typeId, message)
    t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

    const message2 = new Message()
    await instance.message(message2)
    t.equals(Object.keys(instance.ports.ports).length, 0, 'should delete port')
    t.equals(ports[0].messages.length, 1, 'should have delete message')
  })

  tape('port unbinding', async t => {
    t.plan(3)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/unbindPort.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({data: wasm, ports: [ports[1]]})
    const instance = await hypervisor.createInstance(WasmContainer.typeId, message)
    t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

    const message2 = new Message()
    await instance.message(message2)
    t.equals(Object.keys(instance.ports.ports).length, 0, 'should unbind port')
  })

  tape('reading message data', async t => {
    // t.plan(3)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/readMessageData.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({
      data: wasm,
      ports: [ports[1]]
    })

    const instance = await hypervisor.createInstance(WasmContainer.typeId, message)
    t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

    const message2 = new Message({
      data: new Uint8Array([1, 2, 3, 4, 5])
    })
    await instance.message(message2)
    t.end()
  })

  tape('create instance', async t => {
    t.plan(1)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/createInstance.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })
    await hypervisor.createInstance(WasmContainer.typeId, new Message({data: wasm}))
  })

  tape('send messages', async t => {
    t.plan(2)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/sendingMessages.wasm`)
    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({
      data: wasm,
      ports: [ports[1]]
    })
    const instance = await hypervisor.createInstance(WasmContainer.typeId, message)
    t.equals(Object.keys(instance.ports.ports).length, 1, 'should bind port')

    const message2 = new Message()
    await instance.message(message2)
    t.equals(ports[0].messages.length, 1, 'should have message')
  })

  tape('referance map', async t => {
    t.plan(4)
    const hypervisor = new Hypervisor(node.dag)
    const wasm = fs.readFileSync(`${__dirname}/wasm/referances.wasm`)

    hypervisor.registerContainer(WasmContainer, {
      env: SystemInterface,
      test: testInterface(t)
    })

    const ports = hypervisor.createChannel()
    const message = new Message({
      data: wasm,
      ports: [ports[1]]
    })

    await hypervisor.createInstance(WasmContainer.typeId, message)
  })
})
