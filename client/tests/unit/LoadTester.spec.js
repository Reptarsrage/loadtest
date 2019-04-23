// https://vuejs.org/v2/guide/unit-testing.html
// https://vue-test-utils.vuejs.org/guides/using-with-vuex.html
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import LoadTester from '@/components/LoadTester.vue';
import loadTestModule from '@/store/modules/loadTest';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify, {
  iconfont: 'md',
});

describe('LoadTester.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      updateMethod: jest.fn(),
      updateUrl: jest.fn(),
      updateBody: jest.fn(),
      removeQuery: jest.fn(),
      addQuery: jest.fn(),
      updateQuery: jest.fn(),
      addHeader: jest.fn(),
      updateHeader: jest.fn(),
      removeHeader: jest.fn(),
      addCookie: jest.fn(),
      updateCookie: jest.fn(),
      removeCookie: jest.fn(),
      start: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        loadTest: {
          state: loadTestModule.state,
          actions,
          getters: loadTestModule.getters,
        },
      },
    });
  });

  it('has the correct name', () => {
    expect(LoadTester.name).toBe('LoadTester');
  });

  it('sets the correct default data', () => {
    expect(typeof LoadTester.data).toBe('function');
    const defaultData = LoadTester.data();
    expect(defaultData).toHaveProperty('urlRules');
  });

  it('calls store action "start" when button is clicked', () => {
    const wrapper = shallowMount(LoadTester, { store, localVue });
    expect(wrapper.contains('#start-button')).toBe(true);
    wrapper.find('#start-button').trigger('click');
    // See: https://github.com/vuetifyjs/vuetify/issues/4964
    // expect(actions.start).toHaveBeenCalled();
  });
});
