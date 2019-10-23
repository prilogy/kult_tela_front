import Vuex from 'vuex';
import error from './error';

const modules = {
  error
};

const state = {};
const getters = {};
const mutations = {};
const actions = {};

const store = () =>
  new Vuex.Store({
    modules,
    state,
    getters,
    mutations,
    actions
  });

export default store;
