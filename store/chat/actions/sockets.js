import { getChatIndexById } from '../utils'

const sockets = {
  async chatMessage({ commit, state, dispatch }, message) {
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
    dispatch('SET_LAST_SEEN_MESSAGE')
  },
  async chatMessageInit({ commit, dispatch }, message) {
    await dispatch('FEED_CHAT_WITH_USER_ID', { id: message.to_user_id })
    dispatch('SET_LAST_SEEN_MESSAGE')
  },
  async chatMessagesHistoryLoad({ commit, dispatch, state }, messages) {
    if (messages && messages.length > 0) {
      let currentChat = state.currentChat
      currentChat.messages = [...messages, ...currentChat.messages]
    }
  },
  chatMessagesHistoryFull({ dispatch, state }) {
    let currentChat = state.currentChat
    currentChat.history_is_full = true
    dispatch('SET_CHAT', { chat: currentChat })
  },
  async chatMessageLastSeen({ commit, state, dispatch }, info) {
    let chat
    if (state.currentChat && info.room_id === state.currentChat.id) {
      chat = state.currentChat
    } else {
      const index = getChatIndexById(state.chats, { id: info.room_id })
      chat = state.chats[index]
    }
    chat.last_seen_message_id = info.message_id
    dispatch('SET_CHAT', { chat })
  }
}

const attachSocket = obj => {
  let withSocket = {}
  Object.keys(obj).forEach(key => {
    withSocket['socket_' + key] = obj[key]
  })
  return withSocket
}

export default attachSocket(sockets)
