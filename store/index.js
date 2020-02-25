export const strict = false

export const actions = {
  async nuxtClientInit({ commit, getters, dispatch }, { app }) {
    const token = getters['auth/GET_TOKEN']
    let user
    if (token) {
      try {
        const data = await app.$api.Auth.tokenAuth()
        user = data.data
        if (typeof user.plan_id === 'number') {
          await commit('auth/SET_AUTHENTICATED')
          await commit('user/SET_USER', user)
          const ls_wtype = localStorage.getItem('workout_type')
          if (ls_wtype) {
            await commit('workout/SET_WORKOUT_TYPE', ls_wtype, true)
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
