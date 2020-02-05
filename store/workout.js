export const state = () => ({
  workout: null,
  workout_status: null,
  all_exercises: null
})

export const mutations = {
  SET_WORKOUT(state, payload) {
    state.workout = payload
  },
  SET_ALL_EXERCISES(state, payload) {
    state.all_exercises = payload
  }
}

export const actions = {
  async FEED_WORKOUT({ commit }) {
    try {
      const workout = await this.$api.Workout.get()
      commit('SET_WORKOUT', workout.data)
    } catch (e) {
      this.$router.push('/workout')
    }
  },
  async FEED_ALL_EXERCISES({ commit }) {
    try {
      const { data: exercises } = await this.$api.Exercise.getAll()
      commit('SET_ALL_EXERCISES', exercises)
    } catch (e) {
      this.$router.push('/workout')
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
  },
  GET_ALL_EXERCISES: state =>
    state.all_exercises
      ? state.all_exercises.sort((a, b) => (a.title < b.title ? -1 : 1))
      : null,
  GET_EXERCISE_FROM_ALL: state => id =>
    state.all_exercises
      ? state.all_exercises.filter(item => item.id === parseInt(id))[0]
      : null
}
