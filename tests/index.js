const tape = require('tape')
const fs = require('fs')
const AbstractContainer = require('primea-abstract-container')
const Hypervisor = require('primea-hypervisor')
const Message = require('primea-message')
const WasmContainer = require('primea-wasm-container')
const SystemInterface = require('../index.js')
const testInterface = require('./testInterface.js')

const level = require('level-browserify')
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

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))
})

tape('mint cap', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/mintCap.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))
})

tape('adding a cap to a message', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/addCap.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
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

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))
})

tape('getting a messages cap', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/getMessagesCap.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [{}, {}]
  }))
})

tape('reading message data', async t => {
  t.plan(5)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/readMessageData.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))

  const instance = await hypervisor.getActor(cap.destId)
  const message2 = new Message({
    data: new Uint8Array([1, 2, 3, 4, 5])
  })
  await instance.runMessage(message2)
})

tape('send messages', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)

  class CaptureContainer extends AbstractContainer {
    onMessage (m) {
      t.true(m, 'should receive message')
    }

    static get typeId () {
      return 9
    }
  }

  const wasm = fs.readFileSync(`${__dirname}/wasm/sendingMessages.wasm`)
  hypervisor.registerContainer(CaptureContainer)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const captureCap = await hypervisor.createActor(CaptureContainer.typeId, new Message())
  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [captureCap]
  }))
})

tape('referance map', async t => {
  t.plan(3)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/referances.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [{}]
  }))
})

tape('getting message tags', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/getMessageTag.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))

  cap.tag = 2

  const message1 = new Message()
  hypervisor.send(cap, message1)
})

tape('getting next message', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/getNextMessage.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))

  const message1 = new Message()
  hypervisor.send(cap, message1)
})

tape('creation test', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/createInstance.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))
})

tape('loading caps from messages that dont exist', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/invalidIndex.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }).on('execution:error', e => {
    t.pass('should error')
  }))
})

tape('store', async t => {
  const hypervisor = new Hypervisor(tree)
  const main = fs.readFileSync(`${__dirname}/wasm/store.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: main
  }))

  await hypervisor.send(cap, new Message())
  t.end()
})
