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
  },
  SET_TOKEN(state, payload) {
    state.token = payload
    localStorage.setItem('token', payload)
  }
}

export const actions = {
  async LOGIN({ commit, dispatch }, { email, password }) {
    try {
      const result = await this.$axios.$post('/users', { email, password })
      if (result.success) {
        commit('SET_USER', result.data.user)
        commit('SET_TOKEN', result.data.token)
        $nuxt.$router.push('/')
      }
    } catch (error) {}
  },
  async AUTO_LOGIN({ commit, dispatch }) {
    /*console.log('sdsds')
    try {
      const result = await this.$axios.$post('/users', {
        email: 'sds',
        password: 'asds'
      })
      console.log(result)
      if (result.success) {
        commit('SET_USER', result.data.user)
        this.$router.push('/')
      }
    } catch (error) {}*/
    this.$router.push('/')
  },
  REGISTER({ commit }, { login, password }) {},
  LOGOUT({ commit }) {}
}

export const getters = {
  GET_USER(state) {
    return state.user
  },
  GET_TOKEN(state) {
    return state.token
  }
}
