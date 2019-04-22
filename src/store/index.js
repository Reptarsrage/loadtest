import Vue from "vue";
import Vuex from "vuex";

import loadTest from "./modules/loadTest";
import theme from "./modules/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loadTest,
    theme
  }
});
