[![NPM Package](https://img.shields.io/npm/v/primea-wasm-system-interface.svg?style=flat-square)](https://www.npmjs.org/package/primea-wasm-system-interfeace)
[![Build Status](https://img.shields.io/travis/primea/js-primea-wasm-system-interface.svg?branch=master&style=flat-square)](https://travis-ci.org/primea/js-primea-wasm-system-interface)
[![Coverage Status](https://img.shields.io/coveralls/primea/js-primea-wasm-system-interface.svg?style=flat-square)](https://coveralls.io/primea/js-primea-wasm-system-interface)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

# SYNOPSIS 
This implement the system interface for wasm binaries in primea

# INSTALL
`npm install primea-wasm-system-inteface`

# USAGE
```javascript
const WasmContainer = require('primea-wasm-container')
const SystemInterface = require('primea-system-inteface')

// regester the container with the a hypervisor instance
hypervisor.registerContainer(WasmContainer, {
  system: SystemInterface 
})

```

# WASM API
[./docs/](./docs/spec.md)


# LICENSE
[MPL-2.0](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
