export default {
  namespaced: true,
  state: {
    results: {}
  },
  getters: {
    storedResult21: state => {
      return state.results.step21
    },
    storedResult22: state => {
      return state.results.step22
    },
    storedResult23: state => {
      return state.results.step23
    }
  },
  mutations: {
    setResults (state, results) {
      state.results = results
    }
  }
}
