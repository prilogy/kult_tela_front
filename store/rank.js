export const state = () => ({
  notification: null
})

export const mutations = {
  SET_NOTIFICATION(state, payload) {
    if (payload) {
      state.notification = {
        title: payload.title,
        description: payload.description,
        downranked: payload.downranked || false
      }
    } else {
      state.notification = null
    }
  }
}

export const actions = {
  SET_NOTIFICATION({ commit }, payload) {
    commit('SET_NOTIFICATION', payload)
  }
}

export const getters = {
  GET_RANK_NOTIFICATION(state) {
    return state.notification
  }
}
