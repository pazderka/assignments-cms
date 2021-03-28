<template>
  <VDialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <VRow>
        <VCol cols="12">
          <VBtn
            data-id="complete"
            @click="completeProject"
            dark
            color="success"
            >{{ $t("subcontent.complete") }}</VBtn
          >
          <VBtn
            v-if="user.permission === 'manager' || user.permission === 'hr'"
            @click="openDialog"
            dark
            color="light-blue"
            v-bind="attrs"
            v-on="on"
            data-id="update"
            >{{ $t("subcontent.update") }}</VBtn
          >
          <VBtn
            v-if="user.permission === 'manager'"
            @click="openDialog"
            dark
            color="amber darken-2"
            v-bind="attrs"
            v-on="on"
            data-id="delegate"
            >{{ $t("subcontent.delegate") }}</VBtn
          >
          <VBtn
            v-if="user.permission === 'manager' || user.permission === 'hr'"
            data-id="delete"
            @click="deleteProject"
            dark
            color="error"
            >{{ $t("subcontent.delete") }}</VBtn
          >
        </VCol>
      </VRow>
    </template>
    <VCard>
      <VCardTitle>
        <span :class="$style.head"
          >{{ $t("subcontent.project") }} {{ rowId }} -
          {{ $t(`subcontent.${dialogType}`) }}</span
        >
      </VCardTitle>
      <VCardText>
        <VContainer>
          <VRow>
            <VCol cols="12">
              <VForm v-if="dialogType === 'delegate'">
                <VSelect
                  :items="delegatedEmployees"
                  v-model="delegatedEmployee"
                  dense
                  outlined
                  :label="$t('subcontent.select_employee')"
                ></VSelect>
              </VForm>
              <VForm v-if="dialogType === 'update'">
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
                <DatePickerMenuForm :value.sync="form.deadline" />
                <VSelect
                  :items="$DEPARTMENTS"
                  v-model="form.impact"
                  required
                  :label="$t('common.impact')"
                />
                <VSelect
                  :items="assignees"
                  v-model="form.assignee"
                  required
                  type="email"
                  :label="$t('common.assignee')"
                />
                <VTextarea
                  v-model="form.description"
                  outlined
                  required
                  :label="$t('common.description')"
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
import axios from "axios";
import DatePickerMenuForm from "cms/layout/DatePickerMenuForm";
import { mapGetters } from "vuex";
import { NotificationMixin, MESSAGE_TYPES } from "cms/NotificationMixin";
import { ProjectBaseMixin } from "cms/ProjectBaseMixin";

export default {
  mixins: [NotificationMixin, ProjectBaseMixin],

  props: {
    rowId: {
      type: Number,
      default: null,
    },
  },

  components: {
    DatePickerMenuForm,
  },

  data() {
    return {
      dialog: null,
      dialogType: null,
      assignees: null,
      form: {
        name: null,
        priority: null,
        progress: null,
        deadline: null,
        impact: null,
        assignee: null,
        description: null,
        projectId: this.rowId,
        status: null,
      },
      delegatedEmployee: null,
      delegatedEmployees: [],
    };
  },

  async mounted() {
    try {
      const { data } = await axios.get(this.getUsersUrl());
      this.assignees = data.map((row) => row.email);
    } catch (err) {
      console.error(err);
      this.notifyMessage(MESSAGE_TYPES.ERROR.text);
    }
  },
  methods: {
    async openDialog(e) {
      let id;

      if (e.target.nodeName === "SPAN") {
        id = e.target.parentElement.dataset.id;
      } else {
        id = e.target.dataset.id;
      }

      this.dialogType = id;

      if (this.dialogType === "update") {
        try {
          const response = await axios.get(this.getProjectByIdUrl(this.rowId));

          for (const key in response.data) {
            if (this.form[key] !== undefined) {
              this.form[key] = response.data[key];
            }
          }
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      } else if (this.dialogType === "delegate") {
        try {
          const response = await axios.get(this.getUsersUrl());

          const employees = response.data.map((employee) => employee.email);
          this.delegatedEmployees = employees;
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      }
    },
    async submit() {
      if (this.dialogType === "update") {
        try {
          await axios.put(this.getUpdateProjectUrl(), {
            data: [this.form],
          });
          this.notifyMessage(MESSAGE_TYPES.SUCCESS.text);
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      } else if (this.dialogType === "delegate") {
        try {
          await axios.put(this.getDelegateProjectUrl(), {
            projectId: this.rowId,
            delegatedTo: this.delegatedEmployee,
          });
          this.notifyMessage(MESSAGE_TYPES.SUCCESS.text);
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      }

      this.dialog = false;
      this.$emit("updateTable");
    },

    async deleteProject() {
      const shouldDelete = confirm(this.$t("subcontent.delete_project"));
      if (shouldDelete) {
        try {
          await axios.delete(this.getProjectByIdUrl(this.rowId));
          this.$emit("updateTable");
          this.notifyMessage(MESSAGE_TYPES.SUCCESS.text);
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      }
    },
    async completeProject() {
      const shouldComplete = confirm(this.$t("subcontent.complete_project"));
      if (shouldComplete) {
        try {
          await axios.put(this.getCompleteProjectUrlById(this.rowId));
          this.$emit("updateTable");
          this.notifyMessage(MESSAGE_TYPES.SUCCESS.text);
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      }
    },
  },

  computed: {
    ...mapGetters("login", ["user"]),
  },
};
</script>

<style lang="scss" module>
.head {
  text-align: center;
  width: 100%;
}
</style>
