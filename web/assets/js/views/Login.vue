<template>
  <VContainer :class="$style.login">
    <VRow justify="center" align="center">
      <VCol cols="12">
        <VCard elevation="5" width="400" class="mx-auto">
          <VCardTitle>Authorization</VCardTitle>
          <VCardSubtitle>Use your company email to log into CMS.</VCardSubtitle>
          <VCardText>
            <VForm ref="loginForm" :value="isFormValid" lazy-validation>
              <VTextField
                :rules="required_rule"
                v-model="email"
                label="Email"
                required
                type="email"
              />
              <VTextField
                v-model="password"
                :rules="required_rule"
                label="Password"
                required
                type="password"
              />
            </VForm>
          </VCardText>
          <VCardActions>
            <VRow>
              <VCol cols="12" class="d-flex justify-space-between">
                <VBtn
                  @click="$refs.loginForm.reset()"
                  dark
                  class="text-white"
                  color="amber darken-2"
                  >Reset</VBtn
                >
                <VBtn @click="submitForm" dark color="light-blue">Login</VBtn>
              </VCol>
            </VRow>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
      isFormValid: false,
      required_rule: [(val) => !!val || "This field is required"],
    };
  },

  methods: {
    submitForm() {
      if (!this.$refs.loginForm.validate()) return;

      this.login({
        email: this.email,
        password: this.password,
      });
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