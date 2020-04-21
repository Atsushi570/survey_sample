import Vue from 'vue'
import Vuex from 'vuex'
import SurveyResults from './SurveyResults'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    SurveyResults
  }
})
