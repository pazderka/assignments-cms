<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>All completed projects</VCardTitle>
          <VCardSubtitle>Trailing 12 months</VCardSubtitle>
          <VCardText>
            <canvas class="ALL_COMPLETED_PROJECTS"></canvas>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>Number of projects by months</VCardTitle>
          <VCardSubtitle>Trailing 12 months</VCardSubtitle>
          <VCardText>
            <canvas class="NUMBER_OF_PROJECTS_MONTHS"></canvas
          ></VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>All employees</VCardTitle>
          <VCardSubtitle>All offices</VCardSubtitle>
          <VCardText><canvas class="ALL_EMPLOYEES_OFFICES"></canvas></VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>Employees per department</VCardTitle>
          <VCardSubtitle>All employees / departments</VCardSubtitle>
          <VCardText
            ><canvas class="ALL_EMPLOYEES_DEPARTMENTS"></canvas
          ></VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  async mounted() {
    await this.drawCharts();
  },

  methods: {
    ...mapActions("chart", ["drawCharts"]),
  },
};
</script>

<style lang="scss" module>
</style>