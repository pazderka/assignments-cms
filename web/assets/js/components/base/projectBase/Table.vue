<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle
          >Your projects
          <VSpacer />
          <VTextField
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
            @input="globalFilter"
          />
        </VCardTitle>
        <VDataTable
          :headers="headers"
          :items="data"
          :items-per-page="5"
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
            <tr :class="$style.filters">
              <td v-for="header in headers" :key="header.value">
                <VTextField
                  v-if="header.widget === 'text'"
                  v-model="filteredHeaders[header.value]"
                  :placeholder="`Search ${header.text}`"
                  type="text"
                  append-icon="mdi-card-text-outline"
                />
                <VTextField
                  v-if="header.widget === 'number'"
                  v-model="filteredHeaders[header.value]"
                  :placeholder="`Search ${header.text}`"
                  type="number"
                  append-icon="mdi-counter"
                />
                <VSelect
                  v-if="header.widget === 'dropdown'"
                  v-model="filteredHeaders[header.value]"
                  :placeholder="`Search ${header.text}`"
                  :items="getColumnData(header)"
                  multiple
                  append-icon="mdi-menu-down-outline"
                />
                <DatePickerMenu
                  v-if="header.widget === 'date'"
                  v-model="filteredHeaders[header.value]"
                  :placeholder="`Search ${header.text}`"
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
import DatePickerMenu from "cms/layout/DatePickerMenu";
import { ProjectBaseMixin } from "cms/ProjectBaseMixin";
import FilterWidget from "projectBase/FilterWidget";

export default {
  components: {
    Subcontent,
    FilterWidget,
    DatePickerMenu,
  },

  mixins: [ProjectBaseMixin],

  async mounted() {
    const url = this.getProjectsUrl();
    const response = await axios.get(url);
    const projects = response.data;
    this.data = projects;

    this.isLoading = false;

    this.originalData = projects;
  },

  computed: {
    headers() {
      if (!this.data.length) return;
      return [
        {
          text: "ID",
          value: "id",
          widget: "number",
          filter: (value) => {
            if (!this.filteredHeaders.id) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(this.filteredHeaders.id.toLowerCase());
          },
        },
        {
          text: "Name",
          value: "name",
          widget: "text",
          filter: (value) => {
            if (!this.filteredHeaders.name) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(this.filteredHeaders.name.toLowerCase());
          },
        },
        {
          text: "Priority",
          value: "priority",
          widget: "dropdown",
          filter: (value) => {
            if (!this.filteredHeaders.priority.length) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(...this.filteredHeaders.priority);
          },
        },
        {
          text: "Progress",
          value: "progress",
          widget: "number",
          filter: (value) => {
            if (!this.filteredHeaders.progress) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(this.filteredHeaders.progress.toLowerCase());
          },
        },
        {
          text: "Deadline",
          value: "deadline",
          widget: "date",
          filter: (value) => {
            if (!this.filteredHeaders.deadline) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(this.filteredHeaders.deadline.toLowerCase());
          },
        },
        {
          text: "Impact",
          value: "impact",
          widget: "dropdown",
          filter: (value) => {
            if (!this.filteredHeaders.impact) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(this.filteredHeaders.impact.toLowerCase());
          },
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
        id: "",
        name: "",
        priority: [],
        progress: "",
        deadline: "",
        impact: "",
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

    globalFilter(value) {
      if (value.length === 0) {
        this.data = this.originalData;
        return;
      }

      this.data = this.data.filter((row) =>
        Object.values(row).some((cell) =>
          cell
            .toString()
            .toLowerCase()
            .trim()
            .includes(value.toString().toLowerCase().trim())
        )
      );
    },
    getColumnData() {
      return ["high", "test1", "test2"];
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
  .filters {
    background-color: #f3f3f3;
  }

  tr {
    cursor: pointer;
    transition: background-color ease-in-out 200ms;
  }
}
</style>