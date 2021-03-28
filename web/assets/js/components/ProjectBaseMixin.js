import moment from "moment-timezone";

export const ProjectBaseMixin = {
  methods: {
    format_date(datetime) {
      return moment(datetime).format("YYYY/MM/DD");
    },

    getProjectsUrl() {
      return "/api/project/user/";
    },

    getUsersUrl() {
      return "/api/users";
    },

    getAddProjectUrl() {
      return "/api/project";
    },

    getProjectByIdUrl(rowId) {
      return `/api/project/${rowId}`;
    },

    getCompleteProjectUrlById(rowId) {
      return `/api/project/complete/${rowId}`;
    },

    getUpdateProjectUrl() {
      return "/api/project/update";
    },

    getDelegateProjectUrl() {
      return "/api/users/delegate";
    },

    getDescriptionUrl() {
      return "/api/project/description";
    },

    getPermissionUrl() {
      return "/api/users/permission";
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