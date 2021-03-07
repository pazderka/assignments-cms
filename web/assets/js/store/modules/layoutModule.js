export default {
  namespaced: true,
  state: {
    drawer: true,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    toggleDrawer(context) {
      context.commit('toggleDrawer');
    }
  },
  getters: {
    getDrawerState(state) {
      return state.drawer;
    }
  },
}