export const strict = false

export const actions = {
  async nuxtClientInit({ commit, getters, dispatch }, ctx) {
    const token = getters['auth/GET_TOKEN']
    if (token) {
      try {
        const { data: user } = await ctx.app.$api.Auth.tokenAuth()

        if (typeof user.plan_id === 'number') {
          await commit('user/SET_USER', user)
          await commit('auth/SET_AUTHENTICATED')

          const ls_wtype = localStorage.getItem('workout_type')
          if (ls_wtype) {
            commit('workout/SET_WORKOUT_TYPE', ls_wtype, true)
          }
        } else {
          dispatch('popup/SET_ERROR', 'Ошибка подключения')
          await dispatch('auth/LOGOUT')
        }
      } catch (err) {
        if (!err.response) {
          dispatch(
            'popup/SET_ERROR',
            'Отсутствует подключение к серверу, попробуйте позднее'
          )
        } else await dispatch('auth/LOGOUT')
      }
    }
  }
}
