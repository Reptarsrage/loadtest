import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import Main from '../components/Main.vue'
import * as mainModule from '../store/main'
import * as queryStringParamsModule from '../store/queryStringParams'
import * as headersModule from '../store/headers'
import * as cookiesModule from '../store/cookies'
import * as loadTestOptionsModule from '../store/loadTestOptions'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('Main', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      'main/updateBody': jest.fn(),
      'main/start': jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        loadTest: {
          state: {
            main: mainModule.state(),
            queryStringParams: queryStringParamsModule.state(),
            headers: headersModule.state(),
            cookies: cookiesModule.state(),
            loadTestOptions: loadTestOptionsModule.state()
          },
          actions,
          getters: {
            'queryStringParams/valid': state => state.queryStringParams.valid,
            'headers/valid': state => state.headers.valid,
            'cookies/valid': state => state.cookies.valid,
            'loadTestOptions/valid': state => state.loadTestOptions.valid,
            'main/body': state => state.main.body,
            'main/results': state => state.main.results,
            'main/loading': state => state.main.loading,
            'main/valid': state => state.main.valid
          }
        }
      }
    })
  })

  it('is a Vue instance', () => {
    const wrapper = shallowMount(Main, { store, localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
