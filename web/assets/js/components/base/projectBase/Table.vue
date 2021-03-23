<template>
  <VRow>
    <VCol cols="12">
      <div class="d-flex justify-space-between">
        <div>
          <AddProjectForm @updateTable="updateTable" />
          <VBtn dark color="amber darken-2" @click="clearFilters"
            >Clear filters</VBtn
          >
        </div>
        <div>
          <VBtn @click="exportCsv" color="amber darken-2" outlined
            >Export CSV</VBtn
          >
        </div>
      </div>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle
          >Your projects
          <VSpacer />
          <VTextField
            append-icon="mdi-magnify"
            label="Global Search..."
            single-line
            hide-details
            v-model="search"
            ref="globalSearch"
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
          item-key="id"
          :loading="isLoading"
          v-model="selectedRow"
          :expanded.sync="expandedRows"
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
                  :value="filteredHeaders[header.value]"
                  :placeholder="`Search ${header.text}`"
                  @filter="dateFilter"
                />
              </td>
            </tr>
          </template>
          <!-- eslint-disable-next-line -->
          <template v-slot:item.deadline="{ item }">
            {{ format_date(item.deadline) }}
          </template>
          <!-- eslint-disable-next-line -->
          <template v-slot:item.expand="{ item }">
            <VBtn
              v-if="item.delegatedTo !== null"
              icon
              color="amber darken-2"
              dark
              @click="expand($event, item)"
            >
              <VIcon>mdi-arrow-down-circle</VIcon>
            </VBtn>
          </template>

          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length">
              This project wasnt originally yours, you were delegated to handle
              it.
            </td>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
    <VCol cols="12" v-if="selectedRow.length">
      <Subcontent @updateTable="updateTable" :rowId="selectedRow[0].id" />
    </VCol>
  </VRow>
</template>

<script>
import axios from "axios";
import moment from "moment-timezone";
import Subcontent from "projectBase/Subcontent";
import DatePickerMenu from "cms/layout/DatePickerMenu";
import { ProjectBaseMixin } from "cms/ProjectBaseMixin";
import FilterWidget from "projectBase/FilterWidget";
import AddProjectForm from "projectBase/AddProjectForm";
import { mapGetters } from "vuex";

export default {
  components: {
    Subcontent,
    FilterWidget,
    DatePickerMenu,
    AddProjectForm,
  },

  mixins: [ProjectBaseMixin],

  async mounted() {
    this.originalFilters = this.filteredHeaders;
    const url = this.getProjectsUrl();
    const response = await axios.post(url, {
      assignee: this.user.email,
    });
    const projects = response.data;
    this.data = projects;

    this.isLoading = false;

    this.originalData = projects;

    const params = new URLSearchParams(location.search);

    for (const param of params) {
      const key = param[0];
      const value = param[1];

      if (key === "deadline") {
        this.filteredHeaders.deadline = value.split(",");
      } else if (key === "impact") {
        this.filteredHeaders.impact = value.split(",");
      } else {
        this.filteredHeaders[key] = value;
      }
    }

    if (params.has("search")) {
      this.search = params.get("search");
      this.globalFilter(params.get("search"));
    }

    if (params.has("row")) {
      this.selectedRow.push({
        id: params.get("row"),
      });
    }
  },

  computed: {
    ...mapGetters("login", ["user"]),
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

            return this.filteredHeaders.priority.includes(
              value.toString().toLowerCase().trim()
            );
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
            if (!this.filteredHeaders.deadline.length) {
              return true;
            }

            return moment(value).isBetween(
              this.filteredHeaders.deadline[0],
              this.filteredHeaders.deadline[1]
            );
          },
        },
        {
          text: "Impact",
          value: "impact",
          widget: "dropdown",
          filter: (value) => {
            if (!this.filteredHeaders.impact.length) {
              return true;
            }

            return this.filteredHeaders.impact.includes(
              value.toString().trim()
            );
          },
        },
        {
          text: "Assignee",
          value: "assignee",
          widget: "text",
          filter: (value) => {
            if (!this.filteredHeaders.assignee) {
              return true;
            }

            return value
              .toString()
              .toLowerCase()
              .includes(this.filteredHeaders.assignee.toLowerCase());
          },
        },
        {
          text: "Details",
          value: "expand",
          sortable: false,
          filterable: false,
          exportable: false,
        },
      ];
    },
  },

  data() {
    return {
      isLoading: true,
      search: "",
      selectedRow: [],
      expandedRows: [],
      data: [],
      filteredHeaders: {
        id: "",
        name: "",
        priority: [],
        progress: "",
        deadline: [],
        impact: [],
        assignee: "",
        permission: "",
        delegatedTo: "",
      },
    };
  },

  watch: {
    filteredHeaders: {
      deep: true,
      handler(new_value) {
        const params = new URLSearchParams(location.search);
        const map = new Map(Object.entries(this.filteredHeaders));

        history.pushState(null, null, "/project-base");

        for (const item of map) {
          const key = item[0];
          const value = item[1];

          if (value.length !== 0) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        }

        if (
          params.toString().length !== 0 &&
          !params.toString().includes("MouseEvent")
        ) {
          history.pushState(null, null, `?${params.toString()}`);
        } else {
          history.pushState(null, null, `/project-base`);
        }
      },
    },
  },

  methods: {
    async selectRow(rowData, row) {
      const isSelected = row.isSelected ? false : true;
      row.select(isSelected);

      // Its deselect
      if (!isSelected) return;
    },

    row_class() {
      return "projectTableRow";
    },

    dateFilter(options) {
      if (Array.isArray(options)) {
        this.filteredHeaders.deadline = options;
      } else {
        this.filteredHeaders.deadline = [];
      }
    },

    globalFilter(value) {
      const params = new URLSearchParams(location.search);

      if (value.length === 0) {
        this.data = this.originalData;
        params.delete("search");

        if (params.toString().length === 0) {
          history.pushState(null, null, `/project-base`);
        } else {
          history.pushState(null, null, `?${params.toString()}`);
        }

        return;
      }

      params.set("search", value);
      history.pushState(null, null, `?${params.toString()}`);

      this.data = this.data.filter((row) => {
        return Object.values(row).some((cell) => {
          return JSON.stringify(cell)
            .toLowerCase()
            .trim()
            .includes(value.toString().toLowerCase().trim());
        });
      });
    },
    getColumnData({ value }) {
      return [...new Set(this.data.map((val) => val[value]))];
    },

    async updateTable() {
      this.isLoading = true;
      const url = this.getProjectsUrl();
      const response = await axios.post(url, {
        assignee: this.user.email,
      });
      const projects = response.data;
      this.data = projects;

      this.isLoading = false;
    },

    expand(event, item) {
      event.stopImmediatePropagation();
      const index = this.expandedRows.findIndex((row) => row.id === item.id);

      if (index === -1) {
        this.expandedRows.push(item);
      } else {
        this.expandedRows.splice(index, 1);
      }
    },

    clearFilters() {
      this.search = "";
      for (const key in this.filteredHeaders) {
        // Prio deadline impax
        if (key === "priority" || key === "deadline" || key === "impact") {
          this.filteredHeaders[key] = [];
        } else {
          this.filteredHeaders[key] = "";
        }
      }

      this.$refs.globalSearch.$listeners.input("");
    },

    exportCsv() {
      const exportHeaders =
        this.headers
          .filter((header) => header.exportable !== false)
          .map((header) => header.text)
          .join(";") + "\n";

      const exportData = this.data
        .map((row) => {
          delete row.delegatedTo;
          delete row.permission;
          delete row.description;
          return Object.values(row);
        })
        .map((row) => row.join(";") + "\n");

      const exported = [
        exportHeaders,
        exportData.toString().replaceAll(",", ""),
      ];

      const blob = new Blob(exported, { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "export.csv");
      link.click();

      URL.revokeObjectURL(url);
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