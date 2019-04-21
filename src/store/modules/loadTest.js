import uuid from "uuid";

const state = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  method: "GET",
  queryItems: [
    {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true
    }
  ],
  headerItems: [
    {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true
    }
  ],
  url: "",
  body: ""
};

const getters = {
  methods: state => state.methods,
  method: state => state.method,
  url: state => state.url,
  body: state => state.body,
  queryItems: state => state.queryItems,
  headerItems: state => state.headerItems
};

const actions = {
  updateMethod: ({ commit }, method) => commit("updateMethod", method),
  updateUrl: ({ commit }, url) => commit("updateUrl", url),
  updateBody: ({ commit }, body) => commit("updateBody", body),
  addQuery: ({ commit }) => {
    const queryItem = {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true
    };

    commit("newQuery", queryItem);
  },
  removeQuery: ({ commit }, id) => commit("removeQuery", id),
  toggleQueryEnabled: ({ commit }, id) => commit("toggleQueryEnabled", id),
  updateQueryName: ({ commit }, id, name) =>
    commit("updateQueryName", id, name),
  updateQueryValue: ({ commit }, id, value) =>
    commit("updateQueryValue", id, value),
  addHeader: ({ commit }) => {
    const headerItem = {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true
    };

    commit("newHeader", headerItem);
  },
  removeHeader: ({ commit }, id) => commit("removeHeader", id),
  toggleHeaderEnabled: ({ commit }, id) => commit("toggleHeaderEnabled", id),
  updateHeaderName: ({ commit }, id, name) =>
    commit("updateHeaderName", id, name),
  updateHeaderValue: ({ commit }, id, value) =>
    commit("updateHeaderValue", id, value)
};

const mutations = {
  updateMethod: (state, method) => (state.method = method),
  updateUrl: (state, url) => (state.url = url),
  updateBody: (state, body) => (state.body = body),
  newQuery: (state, newItem) => state.queryItems.push(newItem),
  removeQuery: (state, id) =>
    (state.queryItems = state.queryItems.filter(item => item.id !== id)),
  toggleQueryEnabled: (state, id) => {
    const idx = state.queryItems.findIndex(item => item.id === id);
    state.queryItems[idx].enabled = !state.queryItems[idx].enabled;
  },
  updateQueryName: (state, id, name) => {
    const idx = state.queryItems.findIndex(item => item.id === id);
    state.queryItems[idx].name = name;
  },
  updateQueryValue: (state, id, value) => {
    const idx = state.queryItems.findIndex(item => item.id === id);
    state.queryItems[idx].value = value;
  },
  newHeader: (state, newItem) => state.headerItems.push(newItem),
  removeHeader: (state, id) =>
    (state.headerItems = state.headerItems.filter(item => item.id !== id)),
  toggleHeaderEnabled: (state, id) => {
    const idx = state.headerItems.findIndex(item => item.id === id);
    state.headerItems[idx].enabled = !state.headerItems[idx].enabled;
  },
  updateHeaderName: (state, id, name) => {
    const idx = state.headerItems.findIndex(item => item.id === id);
    state.headerItems[idx].name = name;
  },
  updateHeaderValue: (state, id, value) => {
    const idx = state.headerItems.findIndex(item => item.id === id);
    state.headerItems[idx].value = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
