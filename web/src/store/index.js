import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: {
      namespaced: true,
      state: {
        email: "",
        password: "",
      },
      mutations: {
        receiveToken(_, payload) {
          localStorage.setItem("token", payload);
        }
      },
      actions: {
        async sendLogin(context, payload) {
          try {
            const result = await axios.post("http://localhost:5000/api/auth", {
              email: payload.email,
              password: payload.password,
            });

            const token = result.data.token;
            router.push("/");
            context.commit("receiveToken", token);
          } catch (err) {
            console.log(err);
          }
        }
      },
      getters: {
        getEmail: state => state.email,
        getPassword: state => state.password,
      }
    }
  }
});
