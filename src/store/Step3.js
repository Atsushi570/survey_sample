export default {
  namespaced: true,
  state: {
    results: {}
  },
  getters: {
    storedResult31: state => {
      return state.results.step31
    }
  },
  mutations: {
    setResults (state, results) {
      state.results = results
    }
  }
}
