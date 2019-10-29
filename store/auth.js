export const state = () => ({
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
    state.isAuthenticated = true
  },
  UNSET_USER(state) {
    state.user = null
    state.isAuthenticated = false
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
      const result = await this.$axios.$post('/auth', { email, password })
      if (result.success) {
        commit('SET_USER', result.data.user)
        commit('SET_TOKEN', result.data.token)
        $nuxt.$router.push('/')
      }
    } catch (error) {}
  },
  async AUTO_LOGIN({ commit, dispatch }) {
    this.$router.push('/')
  },
  REGISTER({ commit }, { login, password }) {},
  LOGOUT({ commit }) {
    commit('UNSET_USER')
    $nuxt.$router.push('/login')
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
