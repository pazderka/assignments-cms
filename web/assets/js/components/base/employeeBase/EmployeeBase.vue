<template>
  <VRow justify="center">
    <VCol cols="7">
      <AddNewEmployeeForm @createEmployee="createEmployee" />
    </VCol>
  </VRow>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import AddNewEmployeeForm from "employeeBase/AddNewEmployeeForm";
import { NotificationMixin, MESSAGE_TYPES } from "cms/NotificationMixin";
import { EmployeeBaseMixin } from "cms/EmployeeBaseMixin";

export default {
  mixins: [NotificationMixin, EmployeeBaseMixin],

  components: {
    AddNewEmployeeForm,
  },

  created() {
    const permission = this.user.permission;
    const isAuth = permission === "manager" || permission === "hr";
    if (!isAuth) {
      this.$router.push("/");
    }
  },

  computed: {
    ...mapGetters("login", ["user"]),
  },

  methods: {
    async createEmployee(form) {
      try {
        const url = this.getEmployeesUrl();
        await axios.post(url, form);
        this.notifyMessage(MESSAGE_TYPES.SUCCESS.text);
      } catch (err) {
        this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        console.error(err);
        return;
      }
    },
  },
};
</script>
