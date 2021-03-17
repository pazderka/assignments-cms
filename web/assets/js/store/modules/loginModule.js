import axios from "axios";


export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  },
  mutations: {
    setAuthenticated(state, userData) {
      state.isAuthenticated = userData.isAuthenticated;
      state.user = userData.user;
      state.isLoading = false;
    },

    login(state, token) {
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["x-auth-token"];
    }
  },
  actions: {
    async login(context, payload) {
      // Its submit validation
      try {
        const { data } = await axios.post("http://localhost:5000/api/auth", payload);
        const token = data.token;
        context.commit("login", token);
      } catch (err) {
        console.error(err);
        return;
      }

    },

    async checkLogin(context) {
      const token = localStorage.getItem("token");
      if (!token) {
        context.commit("setAuthenticated", {
          isAuthenticated: false,
          user: null,
        });
        return;
      }

      axios.defaults.headers.common["x-auth-token"] = token;

      try {
        // Previously logged in
        const { data } = await axios.get("http://localhost:5000/api/auth");
        context.commit("setAuthenticated", {
          isAuthenticated: true,
          user: data,
        });
      } catch (err) {
        // Not logged in previously
        console.error(err);
        return;
      }
    },

    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    isLoading: state => state.isLoading,
    user: state => state.user,
  },
};