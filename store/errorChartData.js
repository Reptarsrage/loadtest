export const state = () => ({
  labels: [],
  totalRequests: [],
  totalErrors: []
})

export const getters = {
  labels: state => state.labels,
  totalRequests: state => state.totalRequests,
  totalErrors: state => state.totalErrors
}

export const actions = {
  clear: ({ commit }) => commit('clear'),
  update: ({ commit }, data) => commit('update', data)
}

export const mutations = {
  clear: state => {
    state.labels = []
    state.totalRequests = []
    state.totalErrors = []
  },
  update: (state, data) => {
    const { totalTimeSeconds = 0, totalRequests = 0, totalErrors = 0 } =
      data || {}

    if (totalTimeSeconds >= 5 * state.labels.length) {
      // error chart
      state.labels = [...state.labels, 5 * state.labels.length]
      state.totalRequests = [
        ...state.totalRequests,
        Math.ceil(totalRequests / totalTimeSeconds)
      ]
      state.totalErrors = [
        ...state.totalErrors,
        Math.ceil(totalErrors / totalTimeSeconds)
      ]
    }
  }
}
