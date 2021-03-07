<template>
  <VApp id="app">
    <VContainer fluid>
      <SideBar />
      <TopBar />
      <Content />
      <Footer />
    </VContainer>
  </VApp>
</template>

<script>
import SideBar from "cms/layout/SideBar";
import TopBar from "cms/layout/TopBar";
import Content from "cms/layout/Content";
import Footer from "cms/layout/Footer";
export default {
  components: {
    SideBar,
    TopBar,
    Content,
    Footer,
  },
};
</script>
