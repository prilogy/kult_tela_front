export const state = () => ({
  workout: null,
  workout_type: 'gym',
  all_exercises: null
})

export const mutations = {
  SET_WORKOUT(state, payload) {
    state.workout = payload
  },
  SET_WORKOUT_TYPE(state, payload, onlyVuex = false) {
    state.workout_type = payload
    if (onlyVuex === false) {
      localStorage.setItem('workout_type', payload)
    }
  },
  SET_ALL_EXERCISES(state, payload) {
    state.all_exercises = payload
  },
  ADD_ONE_EXERCISE(state, exercise) {
    if (state.all_exercises === null) state.all_exercises = [exercise]
    else state.all_exercises = [...state.all_exercises, exercise]
  }
}

export const actions = {
  SET_WORKOUT_TYPE({ commit }, payload) {
    commit('SET_WORKOUT_TYPE', payload)
  },
  async FEED_WORKOUT({ commit }) {
    try {
      const workout = await this.$api.Workout.get()
      commit('SET_WORKOUT', workout.data)
    } catch (e) {
      this.$router.push('/')
    }
  },
  async FEED_ALL_EXERCISES({ commit }) {
    const { data: exercises } = await this.$api.Exercise.getAll()
    commit('SET_ALL_EXERCISES', exercises)
  },
  async FEED_ONE_EXERCISE({ commit }, id) {
    const { data: exercises } = await this.$api.Exercise.getById(id)
    commit('ADD_ONE_EXERCISE', exercises[0])
  }
}

export const getters = {
  GET_WORKOUT: state => state.workout,
  GET_ALL_EXERCISES: state =>
    state.all_exercises
      ? state.all_exercises.sort((a, b) => (a.title < b.title ? -1 : 1))
      : null,
  GET_EXERCISE_FROM_ALL: state => id =>
    state.all_exercises
      ? state.all_exercises.filter(item => item.id === parseInt(id))[0]
      : null
}
