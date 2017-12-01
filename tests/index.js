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

tape('caps storing', async t => {
  t.plan(1)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/storeCap.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })
  const toStore = {}

  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [toStore]
  }))
  const instance = await hypervisor.getActor(cap.destId)
  t.equals(instance.caps.load(1), toStore)
})

tape('load cap', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/loadCap.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const toStore = {}
  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [toStore]
  }))
  const instance = await hypervisor.getActor(cap.destId)
  t.equals(instance.caps.load(0), toStore)

  const message = new Message()
  await instance.runMessage(message)
})

tape('delete cap', async t => {
  t.plan(2)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/deleteCap.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const toStore = {}
  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [toStore]
  }))

  const instance = await hypervisor.getActor(cap.destId)
  t.equals(instance.caps.load(0), toStore)

  const message = new Message()
  await instance.runMessage(message)
  t.equals(instance.caps.load(0), undefined)
})

tape('reading message data', async t => {
  t.plan(6)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/readMessageData.wasm`)
  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const toStore = {}
  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [toStore]
  }))

  const instance = await hypervisor.getActor(cap.destId)
  t.equals(instance.caps.load(0), toStore)

  const message2 = new Message({
    data: new Uint8Array([1, 2, 3, 4, 5])
  })
  await instance.runMessage(message2)
})

tape('send messages', async t => {
  t.plan(2)
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
  const wasmCap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [captureCap]
  }))
  const instance = await hypervisor.getActor(wasmCap.destId)
  t.equals(instance.caps.load(0), captureCap, 'should have cap')

  const message2 = new Message()
  await instance.runMessage(message2)
})

tape('referance map', async t => {
  t.plan(3)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/referances.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm,
    caps: [{}]
  }))
})

tape('store data', async t => {
  t.plan(3)
  const hypervisor = new Hypervisor(tree)
  const wasm = fs.readFileSync(`${__dirname}/wasm/storeData.wasm`)

  hypervisor.registerContainer(WasmContainer, {
    env: SystemInterface,
    test: testInterface(t)
  })

  const cap = await hypervisor.createActor(WasmContainer.typeId, new Message({
    data: wasm
  }))
  // await hypervisor.createStateRoot()
  let value = await hypervisor.tree.get(Buffer.concat([cap.destId, Buffer.alloc(4)]))
  t.equals(Buffer.from(value.value).toString(), 'test data')

  await hypervisor.send(cap, new Message())
  // wait untill the hypervisor is done
  await hypervisor.scheduler.wait(Infinity)

  value = await hypervisor.tree.get(Buffer.concat([cap.destId, Buffer.alloc(4)]))
  t.equals(value.value, undefined, 'should delete data')
  t.end()
})
