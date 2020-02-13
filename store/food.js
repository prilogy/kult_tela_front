export const state = () => ({
  food_menu: null,
  report_status: null,
  tips_videos: null
})

export const mutations = {
  SET_FOOD_MENU(state, payload) {
    if (payload) {
      state.food_menu = payload
    } else {
      state.food_menu = null
    }
  },
  SET_REPORT_STATUS(state, payload) {
    state.report_status = payload
  },
  SET_TIPS_VIDEOS(state, payload) {
    state.tips_videos = payload
  }
}

export const actions = {
  async SET_FOOD_MENU({ commit }) {
    try {
      const { data } = await this.$api.Food.getDaily()
      commit('SET_FOOD_MENU', data)
    } catch (e) {
      await this.$router.push('/food')
      commit('popup/SET_ERROR', 'Ошибка загрузки меню', { root: true })
    }
  },
  async SET_REPORT_STATUS({ commit }, payload) {
    if (!payload) {
      try {
        const { data } = await this.$api.FoodReport.getStatus()
        commit('SET_REPORT_STATUS', data)
      } catch (e) {
        await this.$router.push('/food')
        commit('popup/SET_ERROR', 'Ошибка загрузки статуса отчета', {
          root: true
        })
      }
    } else commit('SET_REPORT_STATUS', payload)
  },
  async FEED_TIPS_VIDEOS({ commit }) {
    try {
      const { data: videos } = await this.$api.Food.getTipsVideos()
      commit('SET_TIPS_VIDEOS', videos)
    } catch (e) {
      await this.$router.push('/food')
      commit('popup/SET_ERROR', 'Ошибка загрузки советов', { root: true })
    }
  }
}

export const getters = {
  GET_FOOD_MENU(state) {
    return state.food_menu
  },
  GET_REPORT_STATUS(state) {
    return state.report_status
  },
  GET_TIPS_VIDEOS: state => state.tips_videos,
  GET_TIP_FROM_ALL: state => id =>
    state.tips_videos
      ? state.tips_videos.filter(item => item.id === parseInt(id))[0]
      : null
}
