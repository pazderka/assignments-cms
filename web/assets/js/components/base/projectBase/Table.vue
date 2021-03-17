<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle
          >Your projects
          <VSpacer />
          <VTextField
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
          />
        </VCardTitle>
        <VDataTable
          :headers="headers"
          :items="data"
          :items-per-page="5"
          :search="search"
          :class="$style.projectTable"
          :single-select="true"
          :item-class="row_class"
          @click:row="selectRow"
          item-key="name"
          :loading="isLoading"
          v-model="selectedRow"
          class="elevation-1"
          light
        >
          <template
            v-for="h in headers"
            v-slot:[`header.${h.value}`]="{ header }"
          >
            <div :key="h.value" :class="$style.headerFilter">
              <Modal :column="h.value" />
              <span>{{ header.text.toUpperCase() }}</span>
            </div>
          </template>

          <!-- eslint-disable-next-line -->
          <template v-slot:item.deadline="{ item }">
            {{ format_date(item.deadline) }}
          </template>
        </VDataTable>
      </VCard>
    </VCol>
    <VCol cols="12" v-if="selectedRow.length">
      <Subcontent />
    </VCol>
  </VRow>
</template>

<script>
import axios from "axios";
import Modal from "cms/layout/Modal";
import Subcontent from "projectBase/Subcontent";
import { ProjectBaseMixin } from "cms/ProjectBaseMixin";

export default {
  components: {
    Modal,
    Subcontent,
  },

  mixins: [ProjectBaseMixin],

  async mounted() {
    const url = this.getProjectsUrl();
    const response = await axios.get(url);
    const projects = response.data;
    this.data = projects;

    this.isLoading = false;
  },

  data() {
    return {
      isLoading: true,
      search: "",
      selectedRow: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Priority", value: "priority" },
        { text: "Progress", value: "progress" },
        { text: "Deadline", value: "deadline" },
        { text: "Impact", value: "impact" },
      ],
      data: [],
    };
  },
  methods: {
    selectRow(rowData, row) {
      const isSelected = row.isSelected ? false : true;
      row.select(isSelected);

      // Its deselect
      if (!isSelected) return;
    },

    row_class() {
      return "projectTableRow";
    },
  },
};
</script>

<style>
tr.v-data-table__selected {
  background-color: #03a8f4 !important;
  color: #fff !important;
}

.projectTableRow td.text-start {
  text-align: center !important;
}
</style>

<style module lang="scss">
.projectTable {
  tr {
    cursor: pointer;
    transition: background-color ease-in-out 200ms;
    text-align: center !important;
  }

  th {
    position: relative;
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    padding: 10px !important;
    i {
      position: absolute !important;
      top: 40%;
      right: 15%;
    }
  }
}

.headerFilter {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0;
}
</style>