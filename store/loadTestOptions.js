export const state = () => ({
  valid: false,
  maxRequests: null,
  concurrency: null,
  maxSeconds: null,
  timeout: null,
  requestsPerSecond: null,
  agentKeepAlive: null,
  indexParam: null,
  insecure: null
})

export const getters = {
  valid: state => state.valid,
  maxRequests: state => state.maxRequests,
  concurrency: state => state.concurrency,
  maxSeconds: state => state.maxSeconds,
  timeout: state => state.timeout,
  requestsPerSecond: state => state.requestsPerSecond,
  agentKeepAlive: state => state.agentKeepAlive,
  indexParam: state => state.indexParam,
  insecure: state => state.insecure
}

export const actions = {
  validate: ({ commit }, valid) => commit('validate', valid),
  updateMaxRequests: ({ commit }, maxRequests) =>
    commit('updateMaxRequests', maxRequests),
  updateConcurrency: ({ commit }, concurrency) =>
    commit('updateConcurrency', concurrency),
  updateMaxSeconds: ({ commit }, maxSeconds) =>
    commit('updateMaxSeconds', maxSeconds),
  updateTimeout: ({ commit }, timeout) => commit('updateTimeout', timeout),
  updateRequestsPerSecond: ({ commit }, requestsPerSecond) =>
    commit('updateRequestsPerSecond', requestsPerSecond),
  updateAgentKeepAlive: ({ commit }, agentKeepAlive) =>
    commit('updateAgentKeepAlive', agentKeepAlive),
  updateIndexParam: ({ commit }, indexParam) =>
    commit('updateIndexParam', indexParam),
  updateInsecure: ({ commit }, insecure) => commit('updateInsecure', insecure)
}

export const mutations = {
  validate: (state, valid) => (state.valid = valid),
  updateMaxRequests: (state, maxRequests) => (state.maxRequests = maxRequests),
  updateConcurrency: (state, concurrency) => (state.concurrency = concurrency),
  updateMaxSeconds: (state, maxSeconds) => (state.maxSeconds = maxSeconds),
  updateTimeout: (state, timeout) => (state.timeout = timeout),
  updateRequestsPerSecond: (state, requestsPerSecond) =>
    (state.requestsPerSecond = requestsPerSecond),
  updateAgentKeepAlive: (state, agentKeepAlive) =>
    (state.agentKeepAlive = agentKeepAlive),
  updateIndexParam: (state, indexParam) => (state.indexParam = indexParam),
  updateInsecure: (state, insecure) => (state.insecure = insecure)
}
