import Vue from 'vue'
import Vuex from 'vuex'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Step1,
    Step2,
    Step3
  }
})
