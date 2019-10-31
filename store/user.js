export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    let user = payload
    if (payload && !user.avatar_src.includes('http://'))
      user.avatar_src = this.$api.getImageLink(user.avatar_src)
    state.user = user
  }
}

export const actions = {
  async UPDATE_WEIGHT({ commit }, new_weight) {
    try {
      const result = await this.$api.User.updateWeight({ new_weight })
    } catch (error) {}
  }
}

export const getters = {
  GET_USER(state) {
    return state.user
  }
}
