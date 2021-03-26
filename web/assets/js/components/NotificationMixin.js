export const MESSAGE_TYPES = Object.freeze({
  SUCCESS: {
    type: "success",
    title: "Success",
    text: "Form successfully submitted",
    duration: 3000
  },
  ERROR: {
    type: "error",
    title: "Error",
    text: "Something went wrong",
    duration: 3000
  },
});

export const NotificationMixin = {
  methods: {
    notifyMessage(type) {
      switch (type) {
        case MESSAGE_TYPES.SUCCESS.text:
          this.$notify(MESSAGE_TYPES.SUCCESS);
          break;
        case MESSAGE_TYPES.ERROR.text:
          this.$notify(MESSAGE_TYPES.ERROR);

          break;
      }
    }
  }
};