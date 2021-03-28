export const ProfileMixin = {
  methods: {
    getManagersUrl() {
      return "/api/users/manager";
    },
    getProfileUrl() {
      return "/api/profile";
    }
  }
}