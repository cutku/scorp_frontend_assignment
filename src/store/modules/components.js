export default {
  state: {
    loginModal: false,
    rightDrawer: false
  },
  mutations: {
    setLoginModal(state) {
      state.loginModal = !state.loginModal;
    },
    setRightDrawer(state, data) {
      state.rightDrawer = data;
    }
  },
  actions: {
    setLoginModal({ commit }) {
      commit("setLoginModal");
    },
    setRightDrawer({ commit }, data) {
      commit("setRightDrawer", data);
    }
  }
};
