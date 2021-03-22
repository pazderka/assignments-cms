<template>
  <VDialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <VBtn v-bind="attrs" v-on="on" dark color="amber darken-2"
        >Add project</VBtn
      >
    </template>
    <VCard>
      <VCardTitle>
        <span class="headline">Add new project</span>
      </VCardTitle>
      <VCardText>
        <VContainer>
          <VRow>
            <VCol cols="12">
              <VForm>
                <VTextField v-model="form.name" required label="Name" />
                <VTextField v-model="form.priority" required label="Priority" />
                <VTextField
                  v-model="form.progress"
                  type="number"
                  required
                  label="Progress"
                />
                <DatePickerMenuForm :value.sync="form.deadline" />
                <VTextField v-model="form.impact" required label="Impact" />
                <VTextField v-model="form.assignee" required label="Assignee" />
                <VTextField
                  v-model="form.permission"
                  required
                  label="Permission"
                />
                <VTextField
                  v-model="form.description"
                  required
                  label="Description"
                />
              </VForm>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn dark color="amber darken-2" @click="dialog = false">Close</VBtn>
        <VBtn dark color="light-blue" @click="submit">Submit</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import DatePickerMenuForm from "cms/layout/DatePickerMenuForm";
export default {
  components: {
    DatePickerMenuForm,
  },

  data() {
    return {
      dialog: false,
      form: {
        name: null,
        priority: null,
        progress: null,
        deadline: null,
        impact: null,
        assignee: null,
        permission: null,
        description: null,
      },
    };
  },

  methods: {
    submit() {
      console.log("submit");
    },
  },
};
</script>

<style>
</style>