<template>
  <canvas class="companyChart"></canvas>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.createChart(".companyChart");
  },

  methods: {
    ...mapActions("chart", ["createChart"]),
  },
};
</script>

<style>
</style>