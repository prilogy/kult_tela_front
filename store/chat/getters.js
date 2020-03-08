const getters = {
  GET_CHATS: state => {
    /*return state.chats.sort((a, b) =>
      a.messages && b.messages
        ? a.messages[a.messages.length - 1].id >
          b.messages[b.messages.length - 1].id
          ? -1
          : 1
        : -1
    )*/
    return state.chats
  },
  GET_CURRENT_CHAT: state => state.currentChat
}

export default getters
