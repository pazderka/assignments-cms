import moment from "moment-timezone";

export const ProjectBaseMixin = {
  methods: {
    format_date(datetime) {
      return moment(datetime).format("YYYY/MM/DD");
    },

    getProjectsUrl() {
      return "/api/project/user/";
    }
  }
};