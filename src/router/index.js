import Vue from 'vue'
import VueRouter from 'vue-router'
import JobDetails from '../components/JobDetails'
import JobsScreen from '../components/JobsScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Jobs',
    component: JobsScreen
  },
  {
    path: '/job-details',
    name: 'JobDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: JobDetails
    //component: () => import(/* webpackChunkName: "job-details" */ '../components/JobDetails')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
