export default {
  state: {
    loginModal: false,
    rightDrawer: false,
    tab: "home-homepage"
  },
  mutations: {
    setLoginModal(state) {
      state.loginModal = !state.loginModal;
    },
    setRightDrawer(state, data) {
      state.rightDrawer = data;
    },
    setTab(state, data) {
      state.tab = data;
    }
  },
  actions: {
    setLoginModal({ commit }) {
      commit("setLoginModal");
    },
    setRightDrawer({ commit }, data) {
      commit("setRightDrawer", data);
    },
    setTab({ commit }, data) {
      commit("setTab", data);
    }
  }
};
