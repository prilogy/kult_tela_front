import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const API_URL = process.env.API_URL

export default ({ store }) => {
  const token = store.getters['auth/GET_TOKEN']
  if (token) {
    const socket = io.connect(process.env.API_URL, {
      query: {
        token: token
      }
    })
    Vue.use(VueSocketIOExt, socket, { store })
  }
}
