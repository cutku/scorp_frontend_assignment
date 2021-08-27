
export default {
    state: {
      user: {
          username: "",
          password: "",
          email: ""
      },
    },
    mutations: {
      setUser (state, data) {
            state.user.username = data.username;
            state.user.password = data.password;
            state.user.email = data.email;
      },
    },
    actions: {
        setUser({ commit }, data) {
        commit('setUser', data)
      },
    }
  }
  