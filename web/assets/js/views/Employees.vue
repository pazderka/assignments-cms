<template>
  <EmployeeBase />
</template>

<script>
import EmployeeBase from "employeeBase/EmployeeBase";
import { mapGetters } from "vuex";
export default {
  components: {
    EmployeeBase,
  },
  created() {
    if (this.profile.msg === "There is no profile for this user") {
      this.$router.push("/profile");
      return;
    }
  },
  computed: {
    ...mapGetters("login", ["profile"]),
  },
};
</script>

<style>
</style>