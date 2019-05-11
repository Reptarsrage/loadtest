import axios from 'axios'
import qs from 'qs'

import socket from '~/plugins/socket.io.js'

const initialResults = {
  totalTimeSeconds: 0,
  meanLatencyMs: 0,
  maxLatencyMs: 0,
  minLatencyMs: 0,
  totalRequests: 0,
  totalErrors: 0,
  errorCodes: null
}

export const state = () => ({
  valid: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  method: 'GET',
  url: '',
  body: '',
  results: { ...initialResults },
  loading: false
})

export const getters = {
  methods: state => state.methods,
  method: state => state.method,
  valid: state => state.valid,
  url: state => state.url,
  body: state => state.body,
  loading: state => state.loading,
  results: state => state.results
}

export const actions = {
  updateMethod: ({ commit }, method) => commit('updateMethod', method),
  updateUrl: ({ commit }, url) => commit('updateUrl', url),
  validate: ({ commit }, valid) => commit('validate', valid),
  updateBody: ({ commit }, body) => commit('updateBody', body),
  start: async ({ commit, rootState, dispatch }) => {
    commit('start')
    dispatch('errorChartData/clear', null, { root: true })
    dispatch('latencyChartData/clear', null, { root: true })

    // Parse headers
    const headers = {}
    for (const { name, value, enabled } of rootState.headers.items) {
      if (enabled) {
        headers[name] = value
      }
    }

    // Parse query string parameters
    let queryString = ''
    if (rootState.queryStringParams.items.length > 0) {
      const queryStringObj = {}
      for (const { name, value, enabled } of rootState.queryStringParams
        .items) {
        if (enabled) {
          queryStringObj[name] = value
        }
      }

      queryString = qs.stringify(queryStringObj)
    }

    const options = {
      ...rootState.loadTestOptions,
      url: `${rootState.main.url}${
        queryString === '' ? '?' : ''
      }${queryString}`,
      method: rootState.main.method,
      headers,
      cookies: rootState.cookies.items
        .filter(cookie => cookie.enabled)
        .map(cookie => `${cookie.name}=${cookie.value}`)
    }

    const response = await axios.post(`/loadtest`, options)
    const { data } = response
    const { jobId } = data

    socket.on('end', () => {
      commit('end')
    })

    socket.on('update', data => {
      dispatch('errorChartData/update', data, { root: true })
      dispatch('latencyChartData/update', data, { root: true })
      commit('statusUpdate', data)
    })

    socket.emit('start', jobId)
  }
}

export const mutations = {
  updateMethod: (state, method) => (state.method = method),
  validate: (state, valid) => (state.valid = valid),
  updateUrl: (state, url) => (state.url = url),
  updateBody: (state, body) => (state.body = body),
  start: state => {
    state.loading = true
    state.results = { ...initialResults }
  },
  end: state => (state.loading = false),
  statusUpdate: (state, data) => (state.results = { ...data })
}
