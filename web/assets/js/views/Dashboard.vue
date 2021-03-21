<template>
  <div>
    <VRow justify="center" align="center">
      <VCol cols="12" lg="4">
        <InfoBox title="Credentials" subtitle="Your company status">
          <ul :class="$style.infoList">
            <li><strong>Office</strong>: {{ office }}</li>
            <li><strong>Position</strong>: {{ position }}</li>
            <li><strong>Team Leader</strong>: {{ teamLeader }}</li>
            <li><strong>Tasks for today</strong>: {{ tasksToday }}</li>
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
            <li><strong>Name</strong>: {{ name }}</li>
            <li><strong>Priority</strong>: {{ priority }}</li>
            <li><strong>Progress</strong>: {{ progress }}%</li>
            <li><strong>Deadline</strong>: {{ deadline }}</li>
            <li><strong>Impact</strong>: {{ impact }}</li>
          </ul>
          <div style="width: 100%" class="text-right">
            <VBtn icon>
              <VIcon color="light-blue">mdi-arrow-right-circle</VIcon>
            </VBtn>
          </div>
        </InfoBox>
      </VCol>
      <VCol cols="12" lg="8">
        <InfoBox title="Your Projects" subtitle="Completed tasks by month">
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
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    InfoBox,
    Chart,
  },

  data() {
    return {
      office: null,
      position: null,
      teamLeader: null,
      tasksToday: null,
      name: null,
      priority: null,
      progress: null,
      deadline: null,
      impact: null,
    };
  },

  async mounted() {
    // Get profile
    const { data } = await axios.get("/api/profile/me", {
      "x-auth-token": localStorage.getItem("token"),
    });

    for (const item in data) {
      this[item] = data[item];
    }

    // Get current assignment
    // TODO some logic here
    const response = await axios.get("/api/project/user", {
      "x-auth-token": localStorage.getItem("token"),
    });

    const project = response.data[0];

    for (const item in project) {
      this[item] = project[item];
    }
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