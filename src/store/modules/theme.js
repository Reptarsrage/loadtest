const state = {
  darkTheme: localStorage.getItem("darkTheme") === "true"
};

const getters = {
  darkTheme: state => state.darkTheme
};

const actions = {
  toggleDarkTheme: ({ commit, state }) => {
    localStorage.setItem("darkTheme", !state.darkTheme);
    commit("toggleDarkTheme");
  }
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
