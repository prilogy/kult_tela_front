export const state = () => ({
  food_menu: null
})

export const mutations = {
  SET_FOOD_MENU(state, payload) {
    if (payload) {
      state.food_menu = payload
    } else {
      state.food_menu = null
    }
  }
}

export const actions = {
  async SET_FOOD_MENU({ commit }, payload) {
    try {
      const { data } = await this.$api.Food.getDaily()
      console.log(data)
      commit('SET_FOOD_MENU', data)
    } catch (e) {
      await this.$router.push('/')
      commit('popup/SET_ERROR', 'Ошибка загрузки меню', { root: true })
    }
  }
}

export const getters = {
  GET_FOOD_MENU(state) {
    return state.food_menu
  }
}
