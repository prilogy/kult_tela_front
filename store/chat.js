const socket = v => {
  return v._vm.$socket.client
}

export const state = () => ({
  chats: []
})

export const mutations = {
  SOCKET_CHAT_PINGED(state, payload) {
    console.log(payload)
  },
  SET_CHATS(state, payload) {
    state.chats = payload
  }
}

export const actions = {
  async FEED_CHATS({ commit }) {
    const { data: chats } = await this.$api.Chat.getAll()
    commit('SET_CHATS', chats)
  },
  async FEED_CHAT_WITH_ID({ commit }) {},
  eventA() {
    console.log('asdasd')
    socket(this).emit('eventAA', 'GETAFAKAUS')
  },
  socket_chatPinged() {
    console.log('WHYYY')
  }
}

export const getters = {
  GET_CHATS(state) {
    return state.chats
  },
  GET_CHAT_BY_ID(state, id) {}
}