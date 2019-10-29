import axios from 'axios'

export const actions = {
  async nuxtClientInit({ commit }) {
    const token = localStorage.getItem('token')
    if (token) {
      const { data } = await axios.get('/auth', {
        baseURL: process.env.API_URL,
        headers: { token }
      })
      if (data.success) await commit('auth/SET_USER', data.data.user)
    }
  }
}
