<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>{{
            $t("statistic_base.all_completed_projects_months")
          }}</VCardTitle>
          <VCardSubtitle>{{
            $t("statistic_base.trailing_12_months")
          }}</VCardSubtitle>
          <VCardText>
            <canvas class="ALL_COMPLETED_PROJECTS"></canvas>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>{{
            $t("statistic_base.all_projects_months")
          }}</VCardTitle>
          <VCardSubtitle>{{
            $t("statistic_base.trailing_12_months")
          }}</VCardSubtitle>
          <VCardText>
            <canvas class="NUMBER_OF_PROJECTS_MONTHS"></canvas
          ></VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>{{
            $t("statistic_base.all_employees_offices")
          }}</VCardTitle>
          <VCardSubtitle>{{ $t("statistic_base.all_time") }}</VCardSubtitle>
          <VCardText><canvas class="ALL_EMPLOYEES_OFFICES"></canvas></VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" lg="6" md="6">
        <VCard>
          <VCardTitle>{{
            $t("statistic_base.all_employees_departments")
          }}</VCardTitle>
          <VCardSubtitle>{{ $t("statistic_base.all_time") }}</VCardSubtitle>
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
    await this.drawCharts({
      months: this.$MONTHS,
      offices: this.$OFFICES,
      departments: this.$DEPARTMENTS,
    });
  },

  methods: {
    ...mapActions("chart", ["drawCharts"]),
  },
};
</script>
