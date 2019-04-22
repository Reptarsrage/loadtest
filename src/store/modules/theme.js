const state = {
  darkTheme: false
};

const getters = {
  darkTheme: state => state.darkTheme
};

const actions = {
  toggleDarkTheme: ({ commit }) => commit("toggleDarkTheme")
};

const mutations = {
  toggleDarkTheme: state => (state.darkTheme = !state.darkTheme)
};

export default {
  state,
  getters,
  actions,
  mutations
};
