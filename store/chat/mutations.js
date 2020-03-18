import { getChatIndexById } from './utils'
import dateFuncs from '~/mixins/dateFuncs'

const convertChatDates = chat => {
  if (chat) {
    if (chat.messages) {
      chat.messages.map(e => {
        if (e.date && typeof e.date === 'string') {
          e.date = dateFuncs.methods.convertDate(e.date)
        }
        return e
      })
    }
  }
  return chat
}

const mutations = {
  SET_CHATS(state, payload) {
    if (Array.isArray(payload)) {
      payload.map(e => convertChatDates(e))
    }
    state.chats = payload
  },
  SET_CHAT(state, chat) {
    const index = getChatIndexById(state.chats, { id: chat.id })
    chat = convertChatDates(chat)
    if (index === -1) state.chats.push(chat)
    else {
      this._vm.$set(state.chats, index, chat)
    }
  },
  SET_CURRENT_CHAT(state, chat) {
    chat = convertChatDates(chat)
    this._vm.$set(state, 'currentChat', chat)
  },
  SET_IS_NEW_MESSAGES(state, payload) {
    state.isNewMessages = payload
  }
}

export default mutations
