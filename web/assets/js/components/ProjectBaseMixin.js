import moment from "moment-timezone";

export const ProjectBaseMixin = {
  methods: {
    format_date(datetime) {
      return moment(datetime).format("YYYY/MM/DD");
    },

    getProjectsUrl() {
      return "/api/project/user/";
    },

    getHeaders(response) {
      const headers = Object.keys(response[0]).map(key => {
        return {
          text: key,
          value: key,
          filter: value => {
            return true;
          }
        };
      });

      return headers;
    },
  }
};