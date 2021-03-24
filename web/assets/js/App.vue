<template>
  <VApp id="app">
    <VProgressCircular
      v-if="isLoading"
      :size="50"
      color="primary"
      indeterminate
      :class="$style.loader"
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
    <notifications position="bottom left" />
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

<style lang="scss" module>
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
