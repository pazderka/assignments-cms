<template>
  <VCard>
    <VCardTitle>{{ $t("employee.create_new_employee") }}</VCardTitle>
    <VCardText>
      <VForm
        :class="$style.createUserForm"
        v-model="isValid"
        ref="createUserForm"
        :rules="required_rule"
        laty-validation
      >
        <VTextField
          v-model="form.firstName"
          :label="$t('common.first_name')"
          :rules="required_rule"
          required
        />
        <VTextField
          v-model="form.lastName"
          :label="$t('common.last_name')"
          :rules="required_rule"
        />
        <VTextField
          v-model="form.password"
          :label="$t('employee.initial_password')"
          :rules="required_rule"
          type="password"
        />
        <VTextField
          v-model="form.email"
          :label="$t('common.email')"
          type="email"
          :rules="required_rule"
        />
        <VSelect
          :items="$PERMISSIONS"
          v-model="form.permission"
          :label="$t('common.permission')"
          :rules="required_rule"
        />
      </VForm>
    </VCardText>
    <VCardActions class="pb-5 px-4">
      <VRow>
        <VCol cols="12" class="d-flex justify-space-between">
          <VBtn
            @click="$refs.createUserForm.reset()"
            color="amber darken-2"
            dark
            >{{ $t("common.reset") }}</VBtn
          >
          <VBtn
            :loading="isSubmitting"
            @click="createEmployee"
            color="light-blue"
            dark
            >{{ $t("common.submit") }}</VBtn
          >
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      isSubmitting: false,
      form: {
        firstName: null,
        lastName: null,
        email: null,
        permission: null,
        password: null,
      },
      required_rule: [(val) => !!val || this.$t("common.field_required")],
    };
  },

  mounted() {
    this.$refs.createUserForm.validate();
  },

  methods: {
    createEmployee() {
      if (!this.$refs.createUserForm.validate()) return;
      this.isSubmitting = true;
      this.$emit("createEmployee", this.form);
      this.isSubmitting = false;
      this.$refs.createUserForm.reset();
    },
  },
};
</script>

<style module lang="scss">
.createUserForm {
  background-color: #f3f3f3;
  padding: 1rem;
  border-radius: 10px;
}
</style>