import { mount } from '@vue/test-utils'
import JobsScreen from "./JobsScreen.vue";

describe('JobsScreen.vue',  ()=>{
    test('Check if service is working', async ()=>{
        const wrapper = mount(JobsScreen);
        console.log('wrap', wrapper);
        const button = wrapper.findAll('button')
        expect(button.exists()).toBe(true)
        // await wrapper.find('#search').trigger('click')
        // expect(wrapper.text()).toContain('Remote')
    })
})