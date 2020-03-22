import { socket, getChatIndexById } from '../utils'

const storeActions = {
  SET_CHAT({ state, commit }, { chat, forceCurrent = false }) {
    const current_id =
      this.$router.history.current.params &&
      parseInt(this.$router.history.current.params.user_id)

    if (chat) {
      if (
        (state.currentChat &&
          (state.currentChat && state.currentChat.id === chat.id)) ||
        forceCurrent === true ||
        (chat.user_ids.includes(current_id) && !chat.conversation)
      )
        commit('SET_CURRENT_CHAT', chat)
      else commit('SET_CHAT', chat)
    }
  },
  async FEED_CHATS({ commit }) {
    try {
      const { data: chats } = await this.$api.Chat.getAll()
      commit('SET_CHATS', chats)
    } catch (e) {
      this.$router.push('/')
    }
  },
  async FEED_CHAT_WITH_USER_ID(
    { commit, dispatch },
    { id, setAsCurrent = false, conversation = false }
  ) {
    const { data: chat } = conversation
      ? await this.$api.Chat.getConversationById(id)
      : await this.$api.Chat.getById(id)
    await dispatch('SET_CHAT', { chat, forceCurrent: setAsCurrent || false })
  },
  SET_CURRENT_CHAT_FROM_CHATS({ state, commit }, id) {
    const index = getChatIndexById(state.chats, { id })

    commit('SET_CURRENT_CHAT', state.chats[index])
  },
  RETURN_CURRENT_CHAT({ state, commit }) {
    commit('SET_CHAT', state.currentChat)
    commit('SET_CURRENT_CHAT', null)
  },
  SEND_MESSAGE({ commit }, data) {
    socket(this).emit('chat_message', {
      text: data.text,
      to_user_id: data.to_user_id,
      room_id: data.room_id,
      attachments: data.attachments
    })
  },
  async SET_LAST_SEEN_MESSAGE({ state, rootState }) {
    const route = this.app.router.currentRoute
    if (route.path.indexOf('messages') !== -1 && route.params.user_id) {
      let chat = state.currentChat
      if (chat.messages && chat.messages.length > 0) {
        const lastMessage = chat.messages[chat.messages.length - 1]
        if (lastMessage.id !== chat.last_seen_message_id) {
          if (lastMessage.user_id !== rootState.user.user.id) {
            const info = {
              message_id: lastMessage.id,
              room_id: chat.id
            }
            socket(this).emit('chat_message_set_last_seen', info)
          }
        }
      }
    }
  },
  async LOAD_MESSAGES_HISTORY({ state }) {
    const currentChat = state.currentChat
    if (currentChat && !currentChat.history_is_full) {
      socket(this).emit('chat_messages_history_load', {
        from_message_id: currentChat.messages[0].id,
        room_id: currentChat.id
      })
    }
  }
}

export default storeActions
