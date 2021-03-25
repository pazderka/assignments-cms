<template>
  <VContainer :class="$style.login">
    <VRow justify="center" align="center">
      <VCol cols="12">
        <VCard elevation="5" width="400" class="mx-auto">
          <VCardTitle>{{ $t("login.sign_in") }}</VCardTitle>
          <VCardSubtitle>{{ $t("login.sign_in_subtitle") }}</VCardSubtitle>
          <VCardText>
            <VForm ref="loginForm" :value="isFormValid" lazy-validation>
              <VTextField
                :rules="required_rule"
                v-model="form.email"
                :label="$t('common.email')"
                required
                type="email"
              />
              <VTextField
                v-model="form.password"
                :rules="required_rule"
                :label="$t('common.password')"
                required
                type="password"
              />
            </VForm>
          </VCardText>
          <VCardActions>
            <VRow>
              <VCol cols="12" class="d-flex justify-space-between">
                <div>
                  <LanguagePicker />
                </div>
                <div>
                  <VBtn
                    @click="$refs.loginForm.reset()"
                    dark
                    class="text-white"
                    color="amber darken-2"
                    >{{ $t("common.reset") }}</VBtn
                  >
                  <VBtn @click="submitForm" dark color="light-blue">{{
                    $t("login.login")
                  }}</VBtn>
                </div>
              </VCol>
            </VRow>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import LanguagePicker from "cms/layout/LanguagePicker";
import { mapActions } from "vuex";

export default {
  components: {
    LanguagePicker,
  },

  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      isFormValid: false,
      required_rule: [(val) => !!val || this.$t("common.field_required")],
    };
  },

  mounted() {
    this.$refs.loginForm.validate();
  },

  methods: {
    async submitForm() {
      if (!this.$refs.loginForm.validate()) return;

      await this.login(this.form);
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