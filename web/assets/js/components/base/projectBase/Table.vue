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
          <!-- eslint-disable-next-line -->
          <template v-slot:body.prepend>
            <!-- eslint-disable-next-line -->
            <tr>
              <td v-for="header in headers" :key="header.value">
                <VTextField
                  :placeholder="`Search ${header.text}`"
                  v-model="filteredHeaders[header.value]"
                />
              </td>
            </tr>
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
import Subcontent from "projectBase/Subcontent";
import { ProjectBaseMixin } from "cms/ProjectBaseMixin";
import FilterWidget from "projectBase/FilterWidget";

export default {
  components: {
    Subcontent,
    FilterWidget,
  },

  mixins: [ProjectBaseMixin],

  async mounted() {
    const url = this.getProjectsUrl();
    const response = await axios.get(url);
    const projects = response.data;
    this.data = projects;

    this.isLoading = false;
  },

  computed: {
    headers() {
      if (!this.data.length) return;
      return [
        {
          text: "ID",
          value: "id",
          filter: (val) => {
            // It takes even 0, but it doesnt matter, 0 is never a PK
            if (!this.filteredHeaders.id) return true;

            return val === parseInt(this.filteredHeaders.id);
          },
        },
        {
          text: "Name",
          value: "name",
          filter: (val) => {
            console.log(this.filteredHeaders.name, val);
            return true;
          },
        },
        {
          text: "Priority",
          value: "priority",
        },
        {
          text: "Progress",
          value: "progress",
        },
        {
          text: "Deadline",
          value: "deadline",
        },
        {
          text: "Impact",
          value: "impact",
        },
      ];
    },
  },

  data() {
    return {
      isLoading: true,
      search: "",
      selectedRow: [],
      data: [],
      filteredHeaders: {
        id: null,
        name: null,
        priority: null,
        progress: null,
        deadline: null,
        impact: null,
      },
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

    filter(options) {
      console.log(options);
    },
  },
};
</script>

<style>
tr.v-data-table__selected {
  background-color: #03a8f4 !important;
  color: #fff !important;
}
</style>

<style module lang="scss">
.projectTable {
  tr {
    cursor: pointer;
    transition: background-color ease-in-out 200ms;
  }
}
</style>