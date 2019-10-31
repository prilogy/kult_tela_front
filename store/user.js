export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    let user = payload
    if (!user.avatar_src.includes('http://'))
      user.avatar_src = this.$api.getImageLink(user.avatar_src)
    state.user = user
  }
}

export const actions = {
  UPDATE_WEIGHT({ commit }, new_weight) {
    try {
    } catch (error) {}
  }
}

export const getters = {
  GET_USER(state) {
    return state.user
  }
}
