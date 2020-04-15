import Vue from 'vue'
import VueRouter from 'vue-router'
import Step1 from '../components/pages/Step1.vue'
import Step2 from '../components/pages/Step2.vue'
import Step3 from '../components/pages/Step3.vue'
import Step4 from '../components/pages/Step4.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'step1',
      path: '/',
      component: Step1
    },
    {
      name: 'step2',
      path: '/step2',
      component: Step2
    },
    {
      name: 'step3',
      path: '/step3',
      component: Step3
    },
    {
      name: 'step4',
      path: '/step4',
      component: Step4
    }
  ]
})
