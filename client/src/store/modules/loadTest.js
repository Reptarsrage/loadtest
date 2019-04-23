import uuid from 'uuid';
import axios from 'axios';
import io from 'socket.io-client';

const state = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  method: 'GET',
  queryItems: [
    {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: null,
    },
  ],
  headerItems: [
    {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: null,
    },
  ],
  cookies: [
    {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: null,
    },
  ],
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  body: '',
  options: {
    valid: false,
    maxRequests: 10,
    concurrency: 1,
    maxSeconds: 30,
    timeout: 10,
    requestsPerSecond: 10,
    agentKeepAlive: null,
    indexParam: null,
    insecure: null,
  },
  results: null,
  errorChartData: {
    labels: [],
    datasets: [
      {
        label: 'Requests per second',
        backgroundColor: '#F44336',
        borderColor: '#F44336',
        fill: false,
        data: [],
      },
      {
        label: 'Errors per second',
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        fill: false,
        data: [],
      },
    ],
  },
  latencyChartData: {
    labels: [],
    datasets: [
      {
        label: 'Mean latency (ms)',
        backgroundColor: '#F44336',
        borderColor: '#F44336',
        fill: false,
        data: [],
      },
      {
        label: 'Max latency (ms)',
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        fill: false,
        data: [],
      },
      {
        label: 'Min latency (ms)',
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        fill: false,
        data: [],
      },
    ],
  },
  loading: false,
};

const getters = {
  methods: state => state.methods,
  method: state => state.method,
  url: state => state.url,
  body: state => state.body,
  queryItems: state => state.queryItems,
  headerItems: state => state.headerItems,
  cookies: state => state.cookies,
  options: state => state.options,
  loading: state => state.loading,
  results: state => state.results,
  latencyChartData: state => state.latencyChartData,
  errorChartData: state => state.errorChartData,
};

const actions = {
  updateMethod: ({ commit }, method) => commit('updateMethod', method),
  updateUrl: ({ commit }, url) => commit('updateUrl', url),
  updateBody: ({ commit }, body) => commit('updateBody', body),
  addQuery: ({ commit }) => {
    const queryItem = {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: null,
    };

    commit('newQuery', queryItem);
  },
  removeQuery: ({ commit }, id) => commit('removeQuery', id),
  updateQuery: ({ commit }, queryItem) => commit('updateQuery', queryItem),
  addHeader: ({ commit }) => {
    const headerItem = {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: null,
    };

    commit('newHeader', headerItem);
  },
  removeHeader: ({ commit }, id) => commit('removeHeader', id),
  updateHeader: ({ commit }, headerItem) => commit('updateHeader', headerItem),
  addCookie: ({ commit }) => {
    const cookie = {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: null,
    };

    commit('newCookie', cookie);
  },
  removeCookie: ({ commit }, id) => commit('removeCookie', id),
  updateCookie: ({ commit }, cookie) => commit('updateCookie', cookie),
  updateOptions: ({ commit }, options) => commit('updateOptions', options),
  start: ({ commit, state }) => {
    commit('start');

    const headers = {};
    for (let header in state.headerItems.filter(header => header.enabled)) {
      headers[header.name] = header.value;
    }

    const options = {
      concurrent: state.options.concurrent,
      requestsPerSecond: state.options.requestsPerSecond,
      maxSeconds: state.options.maxSeconds,
      url: state.url,
      method: state.method,
      headers,
      cookies: state.cookies.filter(cookie => cookie.enabled).map(cookie => `${cookie.name}=${cookie.name.value}`),
    };

    axios
      .post('http://localhost:3000/', options)
      .then(response => {
        const { data } = response;
        const { jobId } = data;

        var socket = io.connect('http://localhost:3000');
        socket.on('connect', () => {
          socket.emit('join', jobId);
        });

        socket.on('disconnect', () => {
          commit('statusUpdate');
          commit('end');
        });

        socket.on('end', () => {
          socket.close();
        });

        socket.on('update', data => {
          commit('statusUpdate', data);
        });
      })
      .catch(console.error);
  },
};

const mutations = {
  updateMethod: (state, method) => (state.method = method),
  updateUrl: (state, url) => (state.url = url),
  updateBody: (state, body) => (state.body = body),
  newQuery: (state, newItem) => state.queryItems.push(newItem),
  removeQuery: (state, id) => (state.queryItems = state.queryItems.filter(item => item.id !== id)),
  updateQuery: (state, queryItem) => {
    const idx = state.queryItems.findIndex(item => item.id === queryItem.id);
    state.queryItems[idx] = queryItem;
  },
  newHeader: (state, newItem) => state.headerItems.push(newItem),
  removeHeader: (state, id) => (state.headerItems = state.headerItems.filter(item => item.id !== id)),
  updateHeader: (state, headerItem) => {
    const idx = state.headerItems.findIndex(item => item.id === headerItem.id);
    state.headerItems[idx] = headerItem;
  },
  newCookie: (state, newItem) => state.cookies.push(newItem),
  removeCookie: (state, id) => (state.cookies = state.cookies.filter(item => item.id !== id)),
  updateCookie: (state, cookieItem) => {
    const idx = state.cookies.findIndex(item => item.id === cookieItem.id);
    state.cookies[idx] = cookieItem;
  },
  updateOptions: (state, options) => (state.options = options),
  start: state => (state.loading = true),
  end: state => (state.loading = false),
  statusUpdate: (state, s) => {
    const { totalTimeSeconds, meanLatencyMs, maxLatencyMs, minLatencyMs, totalRequests, totalErrors } =
      s || state.results;

    state.results = s ? { ...s } : state.results;

    if (totalTimeSeconds >= 5 * state.latencyChartData.labels.length) {
      // latency chart
      state.latencyChartData = { ...state.latencyChartData };
      state.latencyChartData.labels.push(5 * state.latencyChartData.labels.length);
      state.latencyChartData.datasets[0].data.push(Math.floor(meanLatencyMs));
      state.latencyChartData.datasets[1].data.push(Math.floor(maxLatencyMs));
      state.latencyChartData.datasets[2].data.push(Math.floor(minLatencyMs));

      // error chart
      state.errorChartData = { ...state.errorChartData };
      state.errorChartData.labels.push(5 * state.latencyChartData.labels.length);
      state.errorChartData.datasets[0].data.push(Math.floor(totalRequests / totalTimeSeconds));
      state.errorChartData.datasets[1].data.push(Math.floor(totalErrors / totalTimeSeconds));
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
