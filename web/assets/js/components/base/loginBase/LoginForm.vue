<template>
  <div>
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
            <VBtn
              :loading="isSubmitting"
              @click="submitForm"
              dark
              color="light-blue"
              >{{ $t("login.login") }}</VBtn
            >
          </div>
        </VCol>
      </VRow>
    </VCardActions>
  </div>
</template>

<script>
import LanguagePicker from "cms/layout/LanguagePicker";

export default {
  props: {
    isSubmitting: {
      type: Boolean,
      default: () => false,
    },
  },

  components: {
    LanguagePicker,
  },

  mounted() {
    this.$refs.loginForm.validate();
  },

  data() {
    return {
      isFormValid: false,
      required_rule: [(val) => !!val || this.$t("common.field_required")],
      form: {
        email: null,
        password: null,
      },
    };
  },

  methods: {
    submitForm() {
      if (!this.$refs.loginForm.validate()) return;
      this.$emit("submitForm", this.form);
    },
  },
};
</script>
