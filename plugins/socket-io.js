import Vue from 'vue'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

export default ({ store }) => {
  const SocketInstance = socketio(process.env.API_URL, {
    query: {
      token: store.getters['auth/GET_TOKEN']
    }
  })

  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: SocketInstance
    })
  )
}
