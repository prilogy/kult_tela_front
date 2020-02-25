import { getChatIndexById } from '../utils'

const sockets = {
  async chatMessage({ commit, state, dispatch }, message) {
    commit('SET_IS_NEW_MESSAGES', true)
    let currentChat = false,
      chat
    if (state.currentChat && message.room_id === state.currentChat.id) {
      currentChat = true

      chat = state.currentChat
      if (chat) {
        if (chat.messages.length > 0) chat.messages.push(message)
        else chat.messages = [message]
      }
    } else {
      const index = getChatIndexById(state.chats, { id: message.room_id })
      chat = state.chats[index]
      if (chat) {
        if (chat.messages.length > 0) chat.messages.push(message)
        else chat.messages = [message]
      }
    }
    await commit(currentChat ? 'SET_CURRENT_CHAT' : 'SET_CHAT', chat)
    dispatch('SET_LAST_SEEN_MESSAGE')
  },
  async chatMessageInit({ commit, dispatch }, message) {
    await dispatch('FEED_CHAT_WITH_USER_ID', { id: message.user_id })
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
    if (chat) chat.last_seen_message_id = info.message_id
    dispatch('SET_CHAT', { chat })
  },
  chatRoomLocked({ dispatch, state }, data) {
    let chat
    if (data.room_id === state.currentChat.id) chat = state.currentChat
    else chat = state.chats.filter(e => e.id === data.room_id)[0]
    if (chat) {
      chat.locked = true
      dispatch('SET_CHAT', { chat })
    }
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
