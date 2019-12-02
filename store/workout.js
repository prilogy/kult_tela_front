export const state = () => ({
  workout: null,
  workout_status: null
})

export const mutations = {
  SET_WORKOUT(state, payload) {
    state.workout = payload
  }
}

export const actions = {
  async SET_WORKOUT_BY_ID({ commit }, id) {
    const workout = await this.$api.Workout.getById(id)
    commit('SET_WORKOUT', workout.data)
  }
}

export const getters = {
  GET_WORKOUT(state) {
    let workout = state.workout
    if (workout !== null)
      workout.exercises_home = workout.exercises_home.map(item => {
        item.done = true
        return item
      })
    return workout
  }
}
