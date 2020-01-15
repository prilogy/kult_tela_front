export const state = () => ({
  food_menu: null,
  report_status: null
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
  }
}

export const actions = {
  async SET_FOOD_MENU({ commit }, payload) {
    try {
      const { data } = await this.$api.Food.getDaily()
      commit('SET_FOOD_MENU', data)
    } catch (e) {
      await this.$router.push('/')
      commit('popup/SET_ERROR', 'Ошибка загрузки меню', { root: true })
    }
  },
  async SET_REPORT_STATUS({ commit }, payload) {
    try {
      const { data } = await this.$api.FoodReport.getStatus()
      console.log(data)
      commit('SET_REPORT_STATUS', data)
    } catch (e) {
      commit('popup/SET_ERROR', 'Ошибка загрузки статуса отчета', {
        root: true
      })
    }
  }
}

export const getters = {
  GET_FOOD_MENU(state) {
    return state.food_menu
  },
  GET_REPORT_STATUS(state) {
    return state.report_status
  }
}
