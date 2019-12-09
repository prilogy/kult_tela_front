export const state = () => ({
  error: null,
  success: null
})

export const mutations = {
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_SUCCESS(state, payload) {
    state.success = payload
  }
}

export const actions = {
  SET_ERROR({ commit }, payload) {
    console.log('211')
    commit('SET_ERROR', payload)
    setTimeout(() => {
      commit('SET_ERROR', null)
    }, 5000)
  },
  SET_SUCCESS({ commit }, payload) {
    commit('SET_SUCCESS', payload)
    setTimeout(() => {
      commit('SET_SUCCESS', null)
    }, 5000)
  }
}

export const getters = {
  GET_ERROR(state) {
    return state.error
  },
  GET_SUCCESS(state) {
    return state.success
  }
}
