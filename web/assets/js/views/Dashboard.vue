<template>
  <div>
    <VRow justify="center" align="center">
      <VCol cols="12" lg="4">
        <InfoBox title="Credentials" subtitle="Your company status">
          <ul :class="$style.infoList">
            <li>
              <strong>{{ $t("dashboard.office") }}</strong
              >: {{ office }}
            </li>
            <li>
              <strong>{{ $t("dashboard.position") }}</strong
              >: {{ position }}
            </li>
            <li>
              <strong>{{ $t("dashboard.team_leader") }}</strong
              >: {{ teamLeader }}
            </li>
            <li class="pb-5">
              <strong>{{ $t("dashboard.tasks_for_today") }}</strong
              >: {{ tasksToday }}
            </li>
          </ul>
        </InfoBox>
        <InfoBox
          v-if="isCurrentProject"
          title="Current project"
          subtitle="Your newest project"
        >
          <ul :class="$style.infoList">
            <li><strong>Name</strong>: {{ name }}</li>
            <li><strong>Priority</strong>: {{ priority }}</li>
            <li><strong>Progress</strong>: {{ progress }}%</li>
            <li>
              <strong>Deadline</strong>:
              {{ formattedDeadline }}
            </li>
            <li><strong>Impact</strong>: {{ impact }}</li>
          </ul>
          <div style="width: 100%" class="text-right">
            <VBtn icon>
              <VIcon @click="redirect" color="light-blue"
                >mdi-arrow-right-circle</VIcon
              >
            </VBtn>
          </div>
        </InfoBox>
      </VCol>
      <VCol cols="12" lg="8">
        <InfoBox
          :title="$t('dashboard.your_projects')"
          :subtitle="$t('dashboard.your_projects_subtitle')"
        >
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
import moment from "moment-timezone";

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
      projectId: null,
      isCurrentProject: false,
    };
  },

  methods: {
    redirect() {
      this.$router.push(`/project-base?row=${this.projectId}`);
    },
  },

  computed: {
    formattedDeadline() {
      return moment(this.deadline).format("YYYY/MM/DD");
    },
  },

  async mounted() {
    // Get profile
    const profile = await axios.get("/api/profile/me", {
      "x-auth-token": localStorage.getItem("token"),
    });

    if (profile.data.msg === "There is no profile for this user") {
      this.$router.push("/profile");
      return;
    }

    const data = profile.data;

    for (const item in data) {
      this[item] = data[item];
    }

    // Get current assignment
    // TODO some logic here
    const response = await axios.get("/api/project/user", {
      "x-auth-token": localStorage.getItem("token"),
    });

    if (response.data.length === 0) {
      return;
    }

    const project = response.data[0];

    for (const item in project) {
      this[item] = project[item];
    }

    this.projectId = project.id;
    this.isCurrentProject = true;
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