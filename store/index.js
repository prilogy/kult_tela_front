import axios from 'axios'

export const actions = {
  async nuxtClientInit({ commit, dispatch }, { req, redirect }) {
    const { data } = await axios.get('/users', {
      baseURL: process.env.API_URL,
      headers: { token: localStorage.getItem('token') }
    })
    if (data.success) await commit('auth/SET_USER', data.data.user)
  }
}
