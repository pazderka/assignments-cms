<template>
  <VCard>
    <VToolbar color="light-blue" dark>
      <VToolbarTitle
        >{{ $t("subcontent.project_info") }} - #{{ this.rowId }}</VToolbarTitle
      >
      <template v-slot:extension>
        <VTabs
          @change="changeTab"
          v-model="model"
          slider-color="amber darken-2"
        >
          <VTab> {{ $t("subcontent.description") }} </VTab>
          <VTab> {{ $t("subcontent.actions") }} </VTab>
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
                <p>{{ $t("subcontent.row_expanded") }}</p>
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
import { NotificationMixin, MESSAGE_TYPES } from "cms/NotificationMixin";
import { ProjectBaseMixin } from "cms/ProjectBaseMixin";

export default {
  mixins: [NotificationMixin, ProjectBaseMixin],
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
        try {
          const response = await axios.post(this.getDescriptionUrl(), {
            projectId: this.rowId,
          });
          this.info = response.data;
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      } else if (tab === 1) {
        try {
          const response = await axios.post(this.getPermissionUrl());
          const permission = response.data;
          this.permission = permission;
        } catch (err) {
          console.error(err);
          this.notifyMessage(MESSAGE_TYPES.ERROR.text);
        }
      }
    },

    updateTable() {
      this.$emit("updateTable");
    },
  },
};
</script>
