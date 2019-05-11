import uuid from 'uuid'

export const state = () => ({
  valid: true,
  items: []
})

export const getters = {
  valid: state => state.valid,
  items: state => state.items
}

export const actions = {
  add: ({ commit }) => {
    const headerItem = {
      id: uuid.v4(),
      name: '',
      value: '',
      enabled: true,
      confirm: false
    }

    commit('newHeader', headerItem)
  },
  remove: ({ commit }, id) => commit('remove', id),
  unconfirm: ({ commit }, id) => commit('unconfirm', id),
  updateName: ({ commit }, opts) => commit('updateName', opts),
  updateValue: ({ commit }, opts) => commit('updateValue', opts),
  updateEnabled: ({ commit }, opts) => commit('updateEnabled', opts),
  validate: ({ commit }, valid) => commit('validate', valid)
}

export const mutations = {
  newHeader: (state, newItem) => state.items.push(newItem),
  unconfirm: (state, id) =>
    (state.items[state.items.findIndex(m => m.id === id)].confirm = false),
  remove: (state, id) => {
    const idx = state.items.findIndex(m => m.id === id)
    if (state.items[idx].confirm) {
      state.items[idx].confirm = true
    }

    state.items = state.items.splice(idx, 1)
  },
  updateName: (state, { id, name }) =>
    (state.items[state.items.findIndex(m => m.id === id)].name = name),
  updateValue: (state, { id, value }) =>
    (state.items[state.items.findIndex(m => m.id === id)].value = value),
  updateEnabled: (state, { id, enabled }) =>
    (state.items[state.items.findIndex(m => m.id === id)].enabled = enabled),
  validate: (state, valid) => (state.valid = valid)
}
