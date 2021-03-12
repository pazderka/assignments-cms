<template>
  <VApp id="app">
    <VProgressCircular
      v-if="isLoading"
      :size="50"
      color="primary"
      indeterminate
    />
    <div v-else>
      <VContainer fluid v-if="isAuthenticated">
        <SideBar />
        <TopBar />
        <Content />
        <Footer />
      </VContainer>
      <VContainer fluid v-else>
        <Login />
      </VContainer>
    </div>
  </VApp>
</template>

<script>
import SideBar from "cms/layout/SideBar";
import TopBar from "cms/layout/TopBar";
import Content from "cms/layout/Content";
import Footer from "cms/layout/Footer";
import Login from "views/Login";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    SideBar,
    TopBar,
    Content,
    Footer,
    Login,
  },

  async mounted() {
    await this.checkLogin();
  },

  methods: {
    ...mapActions("login", ["login", "checkLogin"]),
  },

  computed: {
    ...mapGetters("login", ["isAuthenticated", "isLoading"]),
  },
};
</script>
