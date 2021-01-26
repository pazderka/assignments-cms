<template>
  <b-modal id="baseModal" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
</template>

<script>
export default {
  name: "BaseModal",
  mounted() {
    this.$root.$on("bv::modal::show", () => {
      const data = JSON.parse(sessionStorage.getItem("modal-data"));
      console.log(data);
    });
  },
};
</script>

<style>
</style>