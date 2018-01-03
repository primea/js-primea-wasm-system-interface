module.exports = class Store {
  constructor (key, state) {
    this.key = key
    this.state = state
  }

  delete () {
    this.state.delete(this.key)
  }

  update (message) {
    this.state.set(this.key, message)
  }
}
