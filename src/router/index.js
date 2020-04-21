import Vue from 'vue'
import VueRouter from 'vue-router'
import SurveyUserProfile from '../components/pages/SurveyUserProfile'
import SurveyUserState from '../components/pages/SurveyUserState'
import SurveyRequest from '../components/pages/SurveyRequest'
import ConfirmResults from '../components/pages/ConfirmResults'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'surveyUserProfile',
      path: '/',
      component: SurveyUserProfile
    },
    {
      name: 'surveyUserState',
      path: '/surveyUserState',
      component: SurveyUserState
    },
    {
      name: 'surveyRequest',
      path: '/surveyRequest',
      component: SurveyRequest
    },
    {
      name: 'confirmResults',
      path: '/confirmResults',
      component: ConfirmResults
    }
  ]
})
