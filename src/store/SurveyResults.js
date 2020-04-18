export default {
  namespaced: true,
  state: {
    userProfile: {
      gender: {isCommitted: false},
      dateOfBirth: {isCommitted: false}
    },
    userState: {
      joinedInsurance: {isCommitted: false},
      currentHealth: {isCommitted: false},
      pastHealth: {isCommitted: false}
    },
    userRequest: {
      request: {isCommitted: false}
    }
  },
  getters: {
    storedGender: state => {
      return state.userProfile.gender
    },
    storedDateOfBirth: state => {
      return state.userProfile.dateOfBirth
    },
    storedJoinedInsurance: state => {
      return state.userState.joinedInsurance
    },
    storedCurrentHealth: state => {
      return state.userState.currentHealth
    },
    storedPastHealth: state => {
      return state.userState.pastHealth
    },
    storedRequest: state => {
      return state.userRequest.request
    }
  },
  mutations: {
    setGender (state, results) {
      state.userProfile.gender = {...results, isCommitted: true}
    },
    setDateOfBirth (state, results) {
      state.userProfile.dateOfBirth = {...results, isCommitted: true}
    },
    setJoinedInsurance (state, results) {
      state.userState.joinedInsurance = {...results, isCommitted: true}
    },
    setCurrentHealth (state, results) {
      state.userState.currentHealth = {...results, isCommitted: true}
    },
    setPastHealth (state, results) {
      state.userState.pastHealth = {...results, isCommitted: true}
    },
    setRequest (state, results) {
      state.userRequest.request = {...results, isCommitted: true}
    }
  }
}
