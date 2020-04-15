export default {
  namespaced: true,
  state: {
    results: {}
  },
  getters: {
    storedResult11: state => {
      return state.results.step11
    },
    storedResult12: state => {
      return state.results.step12
    }
  },
  mutations: {
    setResults (state, results) {
      state.results = results
    }
  }
}
