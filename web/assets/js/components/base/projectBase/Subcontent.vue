<template>
  <VCard>
    <VToolbar color="light-blue" dark>
      <VToolbarTitle>Project Info - #{{ this.rowId }}</VToolbarTitle>
      <template v-slot:extension>
        <VTabs
          @change="changeTab"
          v-model="model"
          slider-color="amber darken-2"
        >
          <VTab> Description </VTab>
          <VTab> Actions </VTab>
        </VTabs>
      </template>
    </VToolbar>

    <VTabsItems v-model="model">
      <VTabItem>
        <VCard flat>
          <VCardText>
            <p>
              {{ info }}
            </p>
          </VCardText>
        </VCard>
      </VTabItem>
      <VTabItem>
        <VCard flat>
          <VCardText>
            <VRow justify="center">
              <VCol cols="12">
                <p>Actions you are allowed to do to modify this project</p>
                <div class="text-center">
                  <ProjectActionForm
                    @updateTable="updateTable"
                    :rowId="rowId"
                  />
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VTabItem>
    </VTabsItems>
  </VCard>
</template>

<script>
import axios from "axios";
import ProjectActionForm from "projectBase/ProjectActionForm";

export default {
  components: {
    ProjectActionForm,
  },

  props: {
    rowId: {
      type: Number,
      default: null,
    },
  },

  name: "Subcontent",
  data() {
    return {
      model: null,
      info: null,
      permission: null,
      dialog: null,
    };
  },

  watch: {
    async rowId() {
      await this.changeTab(0);
      this.model = 0;
    },
  },

  methods: {
    async changeTab(tab) {
      if (tab === 0) {
        const response = await axios.post("/api/project/description", {
          projectId: this.rowId,
        });
        this.info = response.data;
      } else if (tab === 1) {
        const response = await axios.post("/api/users/permission", {
          "x-auth-token": localStorage.getItem("token"),
        });
        const permission = response.data;
        this.permission = permission;
      }
    },

    updateTable() {
      this.$emit("updateTable");
    },
  },
};
</script>

<style>
</style>