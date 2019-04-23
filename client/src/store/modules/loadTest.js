import uuid from 'uuid';
import axios from 'axios';
import io from 'socket.io-client';

const state = {
  valid: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  method: 'GET',
  queryStringParams: {
    valid: true,
    items: [],
  },
  headers: {
    valid: true,
    items: [],
  },
  cookies: {
    valid: true,
    items: [],
  },
  url: '',
  body: '',
  options: {
    valid: false,
    maxRequests: null,
    concurrency: null,
    maxSeconds: null,
    timeout: null,
    requestsPerSecond: null,
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
  valid: state => state.valid,
  url: state => state.url,
  body: state => state.body,
  queryStringParams: state => state.queryStringParams,
  headers: state => state.headers,
  cookies: state => state.cookies,
  options: state => state.options,
  loading: state => state.loading,
  results: state => state.results,
  latencyChartData: state => state.latencyChartData,
  errorChartData: state => state.errorChartData,
};

const actions = {
  updateMethod: ({ commit }, opts) => commit('updateMethod', opts),
  updateUrl: ({ commit }, opts) => commit('updateUrl', opts),
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
    for (let header in state.headers.items.filter(header => header.enabled)) {
      headers[header.name] = header.value;
    }

    const options = {
      ...state.options,
      url: state.url,
      method: state.method,
      headers,
      cookies: state.cookies.items
        .filter(cookie => cookie.enabled)
        .map(cookie => `${cookie.name}=${cookie.name.value}`),
    };

    const PORT = 3000;
    const HOST = 'localhost';

    axios
      .post(`http://${HOST}:${PORT}`, options)
      .then(response => {
        const { data } = response;
        const { jobId } = data;

        var socket = io.connect(`http://${HOST}:${PORT}`);
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
  updateMethod: (state, { method, valid }) => {
    state.valid = valid;
    state.method = method;
  },
  updateUrl: (state, { url, valid }) => {
    state.valid = valid;
    state.url = url;
  },
  updateBody: (state, body) => (state.body = body),
  newQuery: (state, newItem) => state.queryStringParams.items.push(newItem),
  removeQuery: (state, id) =>
    (state.queryStringParams.items = state.queryStringParams.items.filter(item => item.id !== id)),
  updateQuery: (state, queryStringParams) => (state.queryStringParams = { ...queryStringParams }),
  newHeader: (state, newItem) => state.headers.items.push(newItem),
  removeHeader: (state, id) => (state.headers.items = state.headers.items.filter(item => item.id !== id)),
  updateHeader: (state, headers) => (state.headers = { ...headers }),
  newCookie: (state, newItem) => state.cookies.items.push(newItem),
  removeCookie: (state, id) => (state.cookies = state.cookies.items.filter(item => item.id !== id)),
  updateCookie: (state, cookies) => {
    state.cookies = { ...cookies };
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
