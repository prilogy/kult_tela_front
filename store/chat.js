const socket = v => {
  return v._vm.$socket.client
}

const getChatIndexById = (chats, { user_id, id }) => {
  if (user_id) return chats.map(item => item.user_id).indexOf(user_id)
  else if (id) return chats.map(item => item.id).indexOf(id)
}

export const state = () => ({
  chats: [],
  currentChat: null
})

export const mutations = {
  SOCKET_CHAT_PINGED(state, payload) {
    console.log(payload)
  },
  SET_CHATS(state, payload) {
    state.chats = payload
  },
  SET_CHAT(state, chat) {
    const index = getChatIndexById(state.chats, { user_id: chat.user_id })
    if (index === -1) state.chats.push(chat)
    else {
      this._vm.$set(state.chats, index, chat)
    }
  },
  SET_CURRENT_CHAT(state, chat) {
    //state.currentChat = chat
    this._vm.$set(state, 'currentChat', chat)
  }
}

export const actions = {
  async FEED_CHATS({ commit }) {
    const { data: chats } = await this.$api.Chat.getAll()
    commit('SET_CHATS', chats)
  },
  async FEED_CHAT_WITH_USER_ID({ commit }, { id, setAsCurrent = false }) {
    const { data: chat } = await this.$api.Chat.getById(id)
    if (setAsCurrent === true) await commit('SET_CURRENT_CHAT', chat)
    else await commit('SET_CHAT', chat)
  },
  SET_CURRENT_CHAT({ state, commit }, user_id) {
    const index = getChatIndexById(state.chats, { user_id })

    commit('SET_CURRENT_CHAT', state.chats[index])
  },
  RETURN_CURRENT_CHAT({ state, commit }) {
    commit('SET_CHAT', state.currentChat)
    commit('SET_CURRENT_CHAT', null)
  },
  SEND_MESSAGE({ commit }, data) {
    socket(this).emit('chat_message', {
      text: data.text,
      to_user_id: data.to_user_id
    })
  },
  async SET_LAST_SEEN_MESSAGE({ state, commit, rootState }, chat_id) {
    const index = getChatIndexById(state.chats, { id: chat_id })
    if (index !== -1) {
      let chat = state.chats[index]
      const lastMessage = chat.messages[chat.messages.length - 1]
      if (lastMessage.user_id !== rootState.user.user.id) {
        console.log('isnt me')
        chat.last_seen_message_id = lastMessage.id
        commit('SET_CHAT', chat)
      }
    }

    //commit('SET_CHAT', chat_id)
  },
  async socket_chatMessage({ commit, state }, message) {
    let currentChat = false,
      chat
    if (state.currentChat && message.room_id === state.currentChat.id) {
      currentChat = true

      chat = state.currentChat
      chat.messages.push(message)
    } else {
      const index = getChatIndexById(state.chats, { id: message.room_id })
      chat = state.chats[index]
      chat.messages.push(message)
    }
    await commit(currentChat ? 'SET_CURRENT_CHAT' : 'SET_CHAT', chat)
  },
  async socket_chatMessageInit({ commit, dispatch }, message) {
    dispatch('FEED_CHAT_WITH_USER_ID', { id: message.to_user_id })
  }
}

export const getters = {
  GET_CHATS: state => state.chats,
  GET_CURRENT_CHAT: state => state.currentChat
}
