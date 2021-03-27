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

export default {
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
    const { data } = await axios.get("/api/users");
    this.assignees = data.map((row) => row.email);
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
        const response = await axios.get(`/api/project/${this.rowId}`);

        for (const key in response.data) {
          if (this.form[key] !== undefined) {
            this.form[key] = response.data[key];
          }
        }
      } else if (this.dialogType === "delegate") {
        const response = await axios.get("/api/users");

        const employees = response.data.map((employee) => employee.email);
        this.delegatedEmployees = employees;
      }
    },
    async submit() {
      if (this.dialogType === "update") {
        await axios.put("/api/project/update", {
          data: [this.form],
        });
      } else if (this.dialogType === "delegate") {
        try {
          await axios.put("/api/users/delegate", {
            projectId: this.rowId,
            delegatedTo: this.delegatedEmployee,
          });
        } catch (err) {
          console.error(err);
        }
      }

      this.dialog = false;
      this.$emit("updateTable");
    },

    async deleteProject() {
      const shouldDelete = confirm(this.$t("subcontent.delete_project"));
      if (shouldDelete) {
        await axios.delete(`api/project/${this.rowId}`);
        this.$emit("updateTable");
      }
    },
    async completeProject() {
      const shouldComplete = confirm(this.$t("subcontent.complete_project"));
      if (shouldComplete) {
        await axios.put(`/api/project/complete/${this.rowId}`);
        this.$emit("updateTable");
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