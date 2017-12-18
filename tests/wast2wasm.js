const wast2wasm = require('wast2wasm')
const fs = require('fs')

function filesWast2wasm () {
  const wastFiles = fs.readdirSync(`${__dirname}/wast`)
  for (let file of wastFiles) {
    const wast = fs.readFileSync(`${__dirname}/wast/${file}`).toString()
    wast2wasm(wast).then(wasm => {
      file = file.split('.')[0]
      fs.writeFileSync(`${__dirname}/wasm/${file}.wasm`, wasm.buffer)
    })
  }
}

filesWast2wasm()
