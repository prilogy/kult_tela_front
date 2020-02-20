import { getChatIndexById } from './utils'

const mutations = {
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
    this._vm.$set(state, 'currentChat', chat)
  },
  SET_IS_NEW_MESSAGES(state, payload) {
    state.isNewMessages = payload
  }
}

export default mutations
