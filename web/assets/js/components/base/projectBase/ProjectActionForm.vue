<template>
  <VDialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <VRow>
        <VCol cols="12">
          <VBtn data-id="complete" @click="completeProject" dark color="success"
            >Complete</VBtn
          >
          <VBtn
            @click="openDialog"
            dark
            color="light-blue"
            v-bind="attrs"
            v-on="on"
            data-id="update"
            >Update</VBtn
          >
          <VBtn
            @click="openDialog"
            dark
            color="amber darken-2"
            v-bind="attrs"
            v-on="on"
            data-id="delegate"
            >Delegate</VBtn
          >
          <VBtn data-id="delete" @click="deleteProject" dark color="error"
            >Delete</VBtn
          >
        </VCol>
      </VRow>
    </template>
    <VCard>
      <VCardTitle>
        <span :class="$style.head">Project {{ rowId }} - {{ dialogType }}</span>
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
                  label="Select employee"
                ></VSelect>
              </VForm>
              <VForm v-if="dialogType === 'update'">
                <VTextField v-model="form.name" required label="Name" />
                <VSelect
                  :items="$PRIORITIES"
                  v-model="form.priority"
                  required
                  label="Priority"
                />
                <VTextField
                  v-model="form.progress"
                  type="number"
                  required
                  label="Progress"
                />
                <DatePickerMenuForm :value.sync="form.deadline" />
                <VSelect
                  :items="$DEPARTMENTS"
                  v-model="form.impact"
                  required
                  label="Impact"
                />
                <VSelect
                  :items="assignees"
                  v-model="form.assignee"
                  required
                  type="email"
                  label="Assignee"
                />
                <VTextarea
                  v-model="form.description"
                  outlined
                  required
                  label="Description"
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
            <VBtn dark color="amber darken-2" @click="dialog = false"
              >Close</VBtn
            >
            <VBtn dark color="light-blue" @click="submit">Submit</VBtn>
          </div>
        </VContainer>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import axios from "axios";
import DatePickerMenuForm from "cms/layout/DatePickerMenuForm";

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
      const shouldDelete = confirm(
        `Are you sure you want to delete project ${this.rowId}?`
      );
      if (shouldDelete) {
        await axios.delete(`api/project/${this.rowId}`);
        this.$emit("updateTable");
      }
    },
    async completeProject() {
      const shouldComplete = confirm(
        `Are you sure you want to mark project #${this.rowId} as completed?`
      );
      if (shouldComplete) {
        await axios.put(`/api/project/complete/${this.rowId}`);
        this.$emit("updateTable");
      }
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