<template>
  <VRow>
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
import moment from "moment-timezone";
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

    console.log(this.data);

    this.isLoading = false;

    this.originalData = projects;

    const params = new URLSearchParams(location.search);

    for (const param of params) {
      const key = param[0];
      const value = param[1];

      if (key === "deadline") {
        this.filteredHeaders.deadline = value.split(",");
      } else {
        this.filteredHeaders[key] = value;
      }
    }

    if (params.has("search")) {
      this.search = params.get("search");
      this.globalFilter(params.get("search"));
    }
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

            return value
              .toString()
              .toLowerCase()
              .includes(...this.filteredHeaders.impact);
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
        deadline: [],
        impact: "",
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
    selectRow(rowData, row) {
      const isSelected = row.isSelected ? false : true;
      row.select(isSelected);

      // Its deselect
      if (!isSelected) return;
    },

    row_class() {
      return "projectTableRow";
    },

    dateFilter(options) {
      this.filteredHeaders.deadline = options;
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
    getColumnData({ value }) {
      return [...new Set(this.data.map((val) => val[value]))];
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