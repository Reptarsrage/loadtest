import uuid from "uuid";

const state = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  method: "GET",
  queryItems: [
    {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true,
      confirm: null
    }
  ],
  headerItems: [
    {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true,
      confirm: null
    }
  ],
  cookies: [
    {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true,
      confirm: null
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
  headerItems: state => state.headerItems,
  cookies: state => state.cookies
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
      enabled: true,
      confirm: null
    };

    commit("newQuery", queryItem);
  },
  removeQuery: ({ commit }, id) => commit("removeQuery", id),
  updateQuery: ({ commit }, queryItem) => commit("updateQuery", queryItem),
  addHeader: ({ commit }) => {
    const headerItem = {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true,
      confirm: null
    };

    commit("newHeader", headerItem);
  },
  removeHeader: ({ commit }, id) => commit("removeHeader", id),
  updateHeader: ({ commit }, headerItem) => commit("updateHeader", headerItem),
  addCookie: ({ commit }) => {
    const cookie = {
      id: uuid.v4(),
      name: "",
      value: "",
      enabled: true,
      confirm: null
    };

    commit("newCookie", cookie);
  },
  removeCookie: ({ commit }, id) => commit("removeCookie", id),
  updateCookie: ({ commit }, cookie) => commit("updateCookie", cookie)
};

const mutations = {
  updateMethod: (state, method) => (state.method = method),
  updateUrl: (state, url) => (state.url = url),
  updateBody: (state, body) => (state.body = body),
  newQuery: (state, newItem) => state.queryItems.push(newItem),
  removeQuery: (state, id) =>
    (state.queryItems = state.queryItems.filter(item => item.id !== id)),
  updateQuery: (state, queryItem) => {
    const idx = state.queryItems.findIndex(item => item.id === queryItem.id);
    state.queryItems[idx] = queryItem;
  },
  newHeader: (state, newItem) => state.headerItems.push(newItem),
  removeHeader: (state, id) =>
    (state.headerItems = state.headerItems.filter(item => item.id !== id)),
  updateHeader: (state, headerItem) => {
    const idx = state.headerItems.findIndex(item => item.id === headerItem.id);
    state.headerItems[idx] = headerItem;
  },
  newCookie: (state, newItem) => state.cookies.push(newItem),
  removeCookie: (state, id) =>
    (state.cookies = state.cookies.filter(item => item.id !== id)),
  updateCookie: (state, cookieItem) => {
    const idx = state.cookies.findIndex(item => item.id === cookieItem.id);
    state.cookies[idx] = cookieItem;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
