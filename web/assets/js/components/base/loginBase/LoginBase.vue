<template>
  <VContainer :class="$style.login">
    <VRow justify="center" align="center">
      <VCol cols="12">
        <VCard elevation="5" width="400" class="mx-auto">
          <VCardTitle>{{ $t("login.sign_in") }}</VCardTitle>
          <VCardSubtitle>{{ $t("login.sign_in_subtitle") }}</VCardSubtitle>
          <LoginForm :isSubmitting="isSubmitting" @submitForm="submitForm" />
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import { mapActions } from "vuex";
import { NotificationMixin, MESSAGE_TYPES } from "cms/NotificationMixin";
import LoginForm from "loginBase/LoginForm";

export default {
  components: {
    LoginForm,
  },

  mixins: [NotificationMixin],

  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      isSubmitting: false,
    };
  },

  methods: {
    async submitForm(form) {
      this.isSubmitting = true;
      try {
        await this.login(form);
        this.isSubmitting = false;
      } catch (err) {
        this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        this.isSubmitting = false;
        console.error(err);
      }
    },

    ...mapActions("login", ["login"]),
  },
};
</script>

<style module lang="scss">
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>