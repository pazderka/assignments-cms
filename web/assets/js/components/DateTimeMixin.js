import moment from "moment-timezone";

export const DateTimeMixin = {
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY/MM/DD");
    }
  }
};