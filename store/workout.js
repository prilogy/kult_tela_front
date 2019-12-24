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
    try {
      const workout = await this.$api.Workout.getById(id)
      console.log(workout)
      commit('SET_WORKOUT', workout.data)
    } catch (e) {
      this.$router.push('/')
    }
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
  },
  GET_EXERCISE_FROM_WORKOUT(state) {
    return id => {
      if (state.workout !== null) {
        const exercises = [
          ...state.workout.exercises_home,
          ...state.workout.exercises_gym
        ]
        return exercises.filter(item => item.id === parseInt(id))[0]
      } else return null
    }
  }
}
