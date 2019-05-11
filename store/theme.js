export const state = () => ({
  darkTheme: process.browser
    ? localStorage.getItem('darkTheme') === 'true'
    : false
})

export const getters = {
  darkTheme: state => state.darkTheme
}

export const actions = {
  toggleDarkTheme: ({ commit, state }) => {
    if (process.browser) {
      localStorage.setItem('darkTheme', !state.darkTheme)
    }
    commit('toggleDarkTheme')
  }
}

export const mutations = {
  toggleDarkTheme: state => (state.darkTheme = !state.darkTheme)
}
