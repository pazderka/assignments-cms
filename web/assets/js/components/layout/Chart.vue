<template>
  <canvas class="companyChart"></canvas>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment-timezone";

export default {
  data() {
    return {};
  },

  async mounted() {
    const assignee = this.user.email;

    try {
      const { data } = await axios.post("/api/project/user", {
        assignee,
      });

      const months = this.$MONTHS.map((month) => {
        return data.map((project) => {
          if (month === moment(project.deadline).format("MMMM")) {
            return true;
          }
          return false;
        });
      });
      const count = months.map((arr) => arr.filter(Boolean).length);
      this.createChart({
        selector: ".companyChart",
        data: count,
      });
    } catch (err) {
      console.error(err);
    }
  },

  computed: {
    ...mapGetters("login", ["user"]),
  },

  methods: {
    ...mapActions("chart", ["createChart"]),
  },
};
</script>

<style>
</style>