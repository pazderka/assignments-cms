<template>
  <div>
    <VRow justify="center" align="center">
      <VCol cols="12" lg="4">
        <InfoBox
          :title="$t('dashboard.credentials')"
          :subtitle="$t('dashboard.credentials_subtitle')"
        >
          <ul :class="$style.infoList">
            <li>
              <strong>{{ $t("dashboard.office") }}</strong
              >: {{ profile.office }}
            </li>
            <li>
              <strong>{{ $t("dashboard.department") }}</strong
              >: {{ profile.department }}
            </li>
            <li>
              <strong>{{ $t("dashboard.team_leader") }}</strong
              >: {{ profile.manager }}
            </li>
            <li class="pb-5">
              <strong>{{ $t("dashboard.tasks_for_today") }}</strong
              >: {{ profile.tasksToday }}
            </li>
          </ul>
        </InfoBox>
        <InfoBox
          v-if="lastProject"
          :title="$t('dashboard.last_project')"
          :subtitle="$t('dashboard.last_project_subtitle')"
        >
          <ul :class="$style.infoList">
            <li>
              <strong>{{ $t("common.name") }}</strong
              >: {{ lastProject.name }}
            </li>
            <li>
              <strong>{{ $t("common.priority") }}</strong
              >: {{ lastProject.priority }}
            </li>
            <li>
              <strong>{{ $t("common.progress") }}</strong
              >: {{ lastProject.progress }}%
            </li>
            <li>
              <strong>{{ $t("common.deadline") }}</strong
              >:
              {{ formattedDeadline }}
            </li>
            <li>
              <strong>{{ $t("common.impact") }}</strong
              >: {{ lastProject.impact }}
            </li>
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
import { mapGetters } from "vuex";
import { HomeBaseMixin } from "cms/HomeBaseMixin";
import { DateTimeMixin } from "cms/DateTimeMixin";

export default {
  mixins: [HomeBaseMixin, DateTimeMixin],
  name: "Dashboard",
  components: {
    InfoBox,
    Chart,
  },

  async created() {
    if (this.profile.msg === "There is no profile for this user") {
      this.$router.push(this.getProfileRoute());
      return;
    }

    const { data } = await axios.post(this.getLastProjectUrl(), {
      assignee: this.user.email,
    });
    this.lastProject = data[0];
  },

  data() {
    return {
      lastProject: null,
    };
  },

  methods: {
    redirect() {
      this.$router.push(this.getProjectId(this.lastProject.id));
    },
  },

  computed: {
    ...mapGetters("login", ["profile", "user"]),
    formattedDeadline() {
      return this.formatDate(this.lastProject.deadline);
    },
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
