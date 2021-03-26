import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true,
  },
  mutations: {
    login(state, payload) {
      localStorage.setItem("token", payload);
    },
    checkLogin(state, payload) {
      if (!payload) {
        state.isLoading = false;
        return;
      }

      state.user = payload.user;
      state.profile = payload.profile;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      delete axios.defaults.headers.common["x-auth-token"];
    }
  },
  actions: {
    async login(context, payload) {
      const { data } = await axios.post("/api/auth", payload);
      const token = data.token;

      axios.defaults.headers.common["x-auth-token"] = token;

      const user = await axios.get("/api/auth");
      const profile = await axios.get("/api/profile/me");
      context.commit("login", token);
      context.commit("checkLogin", { user: user.data, profile: profile.data });
    },
    async checkLogin(context) {
      const token = localStorage.getItem("token");

      // It means uset not logged in
      if (token === null) {
        context.commit("checkLogin", false);
        return;
      };

      // User logged in, set token to header
      axios.defaults.headers.common["x-auth-token"] = token;

      const user = await axios.get("/api/auth");
      const profile = await axios.get("/api/profile/me");

      context.commit("checkLogin", { user: user.data, profile: profile.data });
    },

    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    isLoading: state => state.isLoading,
    user: state => state.user,
    profile: state => state.profile
  },
};