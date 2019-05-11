export const state = () => ({
  labels: [],
  meanLatencyMs: [],
  maxLatencyMs: [],
  minLatencyMs: []
})

export const getters = {
  labels: state => state.labels,
  meanLatencyMs: state => state.meanLatencyMs,
  maxLatencyMs: state => state.maxLatencyMs,
  minLatencyMs: state => state.minLatencyMs
}

export const actions = {
  clear: ({ commit }) => commit('clear'),
  update: ({ commit }, data) => commit('update', data)
}

export const mutations = {
  clear: state => {
    state.labels = []
    state.meanLatencyMs = []
    state.maxLatencyMs = []
    state.minLatencyMs = []
  },
  update: (state, data) => {
    const {
      totalTimeSeconds = 0,
      meanLatencyMs = 0,
      maxLatencyMs = 0,
      minLatencyMs = 0
    } = data || {}

    if (totalTimeSeconds >= 5 * state.labels.length) {
      // latency chart
      state.labels = [...state.labels, 5 * state.labels.length]
      state.meanLatencyMs = [...state.meanLatencyMs, Math.floor(meanLatencyMs)]
      state.maxLatencyMs = [...state.maxLatencyMs, Math.floor(maxLatencyMs)]
      state.minLatencyMs = [...state.minLatencyMs, Math.floor(minLatencyMs)]
    }
  }
}
