const getters = {
  GET_CHATS: state => {
    return state.chats.sort((a, b) => {
      const isMsgs =
        a.messages &&
        b.messages &&
        a.messages.length > 0 &&
        b.messages.length > 0
      return isMsgs
        ? a.messages[a.messages.length - 1].id >
          b.messages[b.messages.length - 1].id
          ? -1
          : 1
        : 1
    })
  },
  GET_CURRENT_CHAT: state => state.currentChat
}

export default getters
