export default {
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    SET_ERROR({ commit }, payload) {
      commit('SET_ERROR', payload);
      setTimeout(() => {
        commit('SET_ERROR', null);
      }, 5000);
    }
  },
  getters: {
    GET_ERROR(state) {
      return state.error;
    }
  }
};
