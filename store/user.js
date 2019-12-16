export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    let user = payload
    user.avatar_src = this.$api.getImageLink(user.avatar_src)
    state.user = user
  },
  UPDATE_USER(state, payload) {
    if (state.user) {
      let user = state.user
      for (const prop in payload) {
        user[prop] = payload[prop]
      }
      state.user = user
    }
  }
}

export const actions = {
  async UPDATE_WEIGHT({ commit, state }, new_weight) {
    const currentRank = state.user.rank
    try {
      const result = await this.$api.User.updateWeight({ new_weight })
      commit('UPDATE_USER', result.data)
      const rankPopup = {
        title:
          result.data.rank > currentRank ? 'Новое звание!' : 'Звание понижено!',
        description:
          result.data.rank > currentRank
            ? 'Поздравляем, вы достигли нового звания! Продолжайте в том же духе!'
            : 'Вы служили не так усердно, из-за чего получили понижение в звании!',
        downranked: result.data.rank > currentRank ? false : true
      }
      if (currentRank != result.data.rank)
        commit('rank/SET_NOTIFICATION', rankPopup, { root: true })
    } catch (error) {}
  },
  async SET_LAST_SEEN_NOTIFICATION({ commit, state }) {
    const lastId =
      state.user.notifications[state.user.notifications.length - 1].id
    try {
      const result = await this.$api.User.setLastSeenNotification(lastId)
      if (result.success === true) commit('UPDATE_USER')
      commit('UPDATE_USER', { notifications_last_seen: lastId })
    } catch (e) {
      commit('popup/SET_ERROR', 'Ошибка обновления оповещений', { root: true })
    }
  }
}

export const getters = {
  GET_USER(state) {
    return state.user
  }
}
