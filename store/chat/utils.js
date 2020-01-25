const socket = v => {
  return v._vm.$socket.client
}

const getChatIndexById = (chats, { user_id, id }) => {
  if (user_id) return chats.map(item => item.user_id).indexOf(user_id)
  else if (id) return chats.map(item => item.id).indexOf(id)
}

export { socket, getChatIndexById }

export default { socket, getChatIndexById }
