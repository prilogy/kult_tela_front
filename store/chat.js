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
  },
  SET_CHAT(state, chat) {
    const index = state.chats.map(item => item.id).indexOf(chat.id)
    if (index === -1) state.chats.push(chat)
    else state.chats[index] = chat
  }
}

export const actions = {
  async FEED_CHATS({ commit }) {
    try {
      const { data: chats } = await this.$api.Chat.getAll()
      commit('SET_CHATS', chats)
    } catch (e) {}
  },
  async FEED_CHAT_WITH_ID({ commit }, id) {
    const { data: chat } = await this.$api.Chat.getById(id)
    await commit('SET_CHAT', chat)
  },
  eventA() {
    console.log('asdasd')
    socket(this).emit('eventAA', 'GETAFAKAUS')
  },
  socket_chatPinged() {
    console.log('WHYYY')
  }
}

export const getters = {
  GET_CHATS: state => state.chats,
  GET_CHAT_BY_ID: state => id => state.chats.filter(el => el.user_id == id)[0]
}
