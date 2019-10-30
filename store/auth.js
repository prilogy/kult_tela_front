const getImageLink = image_src =>
  process.env.API_URL + 'public/images/' + image_src

export const state = () => ({
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    let user = payload
    user.avatar_src = getImageLink(user.avatar_src)
    state.user = user
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
      const result = await this.$api.Auth.login({ email, password })
      if (result.success) {
        let user = result.data.user
        user.avatar_src = this.$api.getImageLink(user.avatar_src)
        commit('SET_USER', user)
        commit('SET_TOKEN', result.data.token)
        $nuxt.$router.push('/')
      }
    } catch (error) {}
  },
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
