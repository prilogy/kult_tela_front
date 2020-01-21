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
    const index = state.chats.map(item => item.user_id).indexOf(chat.user_id)
    if (index === -1) state.chats.push(chat)
    else {
      this._vm.$set(state.chats, index, chat)
    }
  },
  ADD_MESSAGE(state, message) {
    const index = state.chats.map(item => item.id).indexOf(message.room_id)
    if (index !== -1) {
      let chat = state.chats[index]
      chat.messages.push(message)
      this._vm.$set(state.chats, index, chat)
    }
  }
}

export const actions = {
  async FEED_CHATS({ commit }) {
    try {
      const { data: chats } = await this.$api.Chat.getAll()
      commit('SET_CHATS', chats)
    } catch (e) {}
  },
  async FEED_CHAT_WITH_USER_ID({ commit }, id) {
    const { data: chat } = await this.$api.Chat.getById(id)
    await commit('SET_CHAT', chat)
  },
  SEND_MESSAGE({ commit }, data) {
    socket(this).emit('chat_message', {
      text: data.text,
      to_user_id: data.to_user_id
    })
  },
  async socket_chatMessage({ commit }, message) {
    if (message) await commit('ADD_MESSAGE', message)
  },
  async socket_chatMessageFirst({ commit, dispatch }, message) {
    dispatch('FEED_CHAT_WITH_USER_ID', message.to_user_id)
  }
}

export const getters = {
  GET_CHATS: state => state.chats,
  GET_CHAT_BY_USER_ID: state => user_id =>
    state.chats.filter(el => el.user_id == user_id)[0]
}
