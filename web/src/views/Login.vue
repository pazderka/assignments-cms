<template>
  <b-container class="login w-25 mt-5">
    <b-form @submit.prevent="handleLogin">
      <label for="email">Company Email:</label>
      <b-input v-model="email" type="email" id="email"></b-input>

      <label for="password">Password:</label>
      <b-input v-model="password" type="password" id="password"></b-input>

      <b-button class="mt-2" type="submit" variant="primary">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("login", ["getEmail", "getPassword", "getToken"]),
  },
  methods: {
    ...mapActions("login", ["sendLogin"]),

    handleLogin() {
      const info = {
        email: this.email,
        password: this.password,
      };

      this.sendLogin(info);
    },
  },

  mounted() {
    this.email = this.getEmail;
    this.password = this.getPassword;
  },
  created() {
    // TODO - here need to check if the token is valid, otherwise clear storage
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  },
};
</script>