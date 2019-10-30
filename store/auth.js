export const state = () => ({
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    let user = payload
    user.avatar_src = this.$api.getImageLink(user.avatar_src)
    state.user = user
    state.isAuthenticated = true
  },
  UNSET_USER(state) {
    state.isAuthenticated = false
    state.user = null
    state.token = null
    localStorage.removeItem('token')
  },
  SET_TOKEN(state, payload) {
    state.token = payload
    localStorage.setItem('token', payload)
  }
}

export const actions = {
  async LOGIN({ commit, dispatch }, { email, password }) {
    try {
      const result = await this.$api.Auth.login({ email, password })
      if (result.success) {
        const { user, token } = result.data
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
        $nuxt.$router.push('/')
      }
    } catch (error) {}
  },
  LOGOUT({ commit }) {
    this.$router.push('/login')
    commit('UNSET_USER')
  }
}

export const getters = {
  GET_USER(state) {
    return state.user
  },
  GET_TOKEN(state) {
    return state.token
  }
}
