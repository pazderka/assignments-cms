<template>
  <Table />
</template>

<script>
import Table from "projectBase/Table.vue";
import { mapGetters } from "vuex";

export default {
  name: "ProjectBase",
  components: {
    Table,
  },

  computed: {
    ...mapGetters("login", ["profile"]),
  },

  created() {
    if (this.profile.msg === "There is no profile for this user") {
      this.$router.push("/profile");
      return;
    }
  },
};
</script>

<style>
</style>