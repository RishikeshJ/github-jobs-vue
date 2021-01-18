import { shallowMount } from '@vue/test-utils'
import JobsScreen from '../../src/components/JobsScreen.vue'
import App from '../../src/App.vue'
import JobDetails from '../../src/components/JobDetails.vue'
import VueRouter from "vue-router"
import routes from "../../src/router/index"

describe('JobsScreen.vue', () => {
  it('renders renders loading spinner', () => {
    const msg = 'Loading...'
    const wrapper = shallowMount(JobsScreen);
    expect(wrapper.text()).toMatch(msg)
  })

  it('renders the page',() => {
    const msg = 'devjobs'
    const wrapper = shallowMount(App);
    expect(wrapper.text()).toMatch(msg)
  })

  // it("renders a child component via routing",  () => {
  //   const router = new VueRouter( routes )
  //   const wrapper = shallowMount(JobsScreen, { 
  //     router
  //   })

  //   router.push("/job-details?id=30cd4668-e917-4b56-a3a6-10dd3c6f65e5")

  //   expect(wrapper.findComponent(JobsScreen).exists()).toBe(true)
  // })
})