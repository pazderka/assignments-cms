<template>
  <EmployeeBase />
</template>

<script>
import EmployeeBase from "employeeBase/EmployeeBase";
import { mapGetters } from "vuex";
export default {
  name: "Employees",
  components: {
    EmployeeBase,
  },
  created() {
    if (this.profile.msg === "There is no profile for this user") {
      this.$router.push("/profile");
      return;
    }

    if (this.user.permission !== "hr") {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    ...mapGetters("login", ["profile"]),
    ...mapGetters("login", ["user"]),
  },
};
</script>
