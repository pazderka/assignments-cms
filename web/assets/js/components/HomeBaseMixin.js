export const HomeBaseMixin = {
  methods: {
    getProfileRoute() {
      return "/profile";
    },
    getLastProjectUrl() {
      return "/api/project/last";
    },
    getProjectId(projectId) {
      return `/project-base?row=${projectId}`;
    }
  },
}