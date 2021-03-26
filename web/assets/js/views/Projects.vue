<template>
  <ProjectBase />
</template>

<script>
import ProjectBase from "projectBase/ProjectBase";
import { mapGetters } from "vuex";

export default {
  name: "Projects",
  components: {
    ProjectBase,
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