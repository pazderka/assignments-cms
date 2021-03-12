<template>
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
      @click:row="selectRow"
      item-key="name"
      v-model="selectedRow"
      class="elevation-1"
      light
    >
      <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }">
        <div :key="h.value" :class="$style.headerFilter">
          <VBtn class="mb-3" small dark color="light-blue"> Filter </VBtn>
          <span>{{ header.text.toUpperCase() }}</span>
        </div>
      </template>
    </VDataTable>
  </VCard>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selectedRow: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {
    selectRow(rowData, row) {
      let selectState = row.isSelected ? false : true;
      row.select(selectState);
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

  th {
    position: relative;
    i {
      display: block !important;
      text-align: center;
      position: absolute !important;
      top: 50%;
      right: 15%;
      transform: translateY(-50%);
    }
  }
}

.headerFilter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f3f3f3;
  padding: 1em;
  border-radius: 10px;
}
</style>