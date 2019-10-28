export const state = () => ({
  error: null
})

export const mutations = {
  SET_ERROR(state, payload) {
    state.error = payload
  }
}

export const actions = {
  SET_ERROR({ commit }, payload) {
    commit('SET_ERROR', payload)
    setTimeout(() => {
      commit('SET_ERROR', null)
    }, 5000)
  }
}

export const getters = {
  GET_ERROR(state) {
    return state.error
  }
}
