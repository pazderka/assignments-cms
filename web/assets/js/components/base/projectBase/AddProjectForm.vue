<template>
  <VDialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <VBtn v-bind="attrs" v-on="on" dark color="amber darken-2">{{
        $t("project_base.add_project")
      }}</VBtn>
    </template>
    <VCard>
      <VCardTitle>
        <span :class="$style.head">{{
          $t("project_base.add_new_project")
        }}</span>
      </VCardTitle>
      <VCardText>
        <VContainer>
          <VRow>
            <VCol cols="12">
              <VForm>
                <VTextField
                  v-model="form.name"
                  required
                  :label="$t('common.name')"
                />
                <VSelect
                  :items="$PRIORITIES"
                  v-model="form.priority"
                  required
                  :label="$t('common.priority')"
                />
                <VTextField
                  v-model="form.progress"
                  type="number"
                  required
                  :label="$t('common.progress')"
                />
                <DatePickerMenuForm @update="updateDate" />
                <VSelect
                  :items="$DEPARTMENTS"
                  v-model="form.impact"
                  required
                  :label="$t('common.impact')"
                />
                <VSelect
                  v-model="form.assignee"
                  :items="assignees"
                  required
                  :label="$t('common.assignee')"
                />
                <VSelect
                  :items="$PERMISSIONS"
                  v-model="form.permission"
                  required
                  :label="$t('common.permission')"
                />
                <VTextarea
                  outlined
                  v-model="form.description"
                  required
                  :label="$t('common.description')"
                />
                <VSelect
                  :items="$STATUSES"
                  v-model="form.status"
                  required
                  :label="$t('common.status')"
                />
              </VForm>
            </VCol>
          </VRow>
        </VContainer>
        <VSpacer />
      </VCardText>
      <VCardActions>
        <VContainer>
          <div class="justify-space-between d-flex">
            <VBtn dark color="amber darken-2" @click="dialog = false">{{
              $t("common.close")
            }}</VBtn>
            <VBtn dark color="light-blue" @click="submit">{{
              $t("common.submit")
            }}</VBtn>
          </div>
        </VContainer>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import DatePickerMenuForm from "cms/layout/DatePickerMenuForm";
import moment from "moment-timezone";
import axios from "axios";
export default {
  components: {
    DatePickerMenuForm,
  },

  data() {
    return {
      dialog: false,
      assignees: null,

      form: {
        name: null,
        priority: null,
        progress: null,
        deadline: moment(Date.now()).format("YYYY/MM/DD"),
        impact: null,
        assignee: null,
        permission: null,
        description: null,
        status: null,
      },
    };
  },

  async mounted() {
    const { data } = await axios.get("/api/users");
    this.assignees = data.map((row) => row.email);
  },

  methods: {
    async submit() {
      await axios.post("/api/project", this.form);
      this.dialog = false;
      this.$emit("updateTable");
    },

    updateDate(new_value) {
      this.form.deadline = new_value;
    },
  },
};
</script>

<style lang="scss" module>
.head {
  text-align: center;
  width: 100%;
}
</style>