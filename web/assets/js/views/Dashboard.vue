<template>
  <div>
    <VRow justify="center" align="center">
      <VCol cols="12" lg="4">
        <InfoBox title="Credentials" subtitle="Your company status">
          <ul :class="$style.infoList">
            <li><strong>Position</strong>: Line Manager</li>
            <li><strong>Team Leader</strong>: Jane Doe</li>
            <li><strong>Tasks for today</strong>: 10</li>
            <li><strong>Missed calls today</strong>: 2</li>
            <li><strong>Position</strong>: Line Manager</li>
          </ul>
          <div style="width: 100%" class="text-right">
            <VBtn icon>
              <VIcon color="light-blue">mdi-settings</VIcon>
            </VBtn>
          </div>
        </InfoBox>
        <InfoBox
          title="Current Assignment"
          subtitle="Assignment you are currently working on"
        >
          <ul :class="$style.infoList">
            <li><strong>Name</strong>: Do something</li>
            <li><strong>Priority</strong>: High</li>
            <li><strong>Progress</strong>: 80%</li>
            <li><strong>Deadline</strong>: 2021/01/02</li>
            <li><strong>Impact</strong>: HR</li>
          </ul>
          <div style="width: 100%" class="text-right">
            <VBtn icon>
              <VIcon color="light-blue">mdi-arrow-right-circle</VIcon>
            </VBtn>
          </div>
        </InfoBox>
      </VCol>
      <VCol cols="12" lg="8">
        <InfoBox title="Your Sales" subtitle="Data for past 12 months.">
          <Chart />
        </InfoBox>
      </VCol>
    </VRow>
    <VRow justify="center"> </VRow>
  </div>
</template>

<script>
import InfoBox from "cms/layout/InfoBox";
import Chart from "cms/layout/Chart";

export default {
  name: "Dashboard",
  components: {
    InfoBox,
    Chart,
  },
};
</script>

<style module lang="scss">
.infoList {
  list-style: none;
  li::before {
    content: "\2707";
    color: #4caf50;
    margin-right: 5px;
  }
}
</style>