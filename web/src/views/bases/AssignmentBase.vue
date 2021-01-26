<template>
  <div class="container">
    <div class="c_filters">
      <b-dropdown text="Status" variant="primary" class="mr-2 my-3">
        <b-dropdown-item href="#">Active</b-dropdown-item>
        <b-dropdown-item href="#">New</b-dropdown-item>
        <b-dropdown-item href="#">In Progress</b-dropdown-item>
        <b-dropdown-item href="#">Closed</b-dropdown-item>
      </b-dropdown>
      <b-dropdown text="Relation" variant="primary" class="mx-2 my-3">
        <b-dropdown-item href="#">Owner</b-dropdown-item>
        <b-dropdown-item href="#">Delegated</b-dropdown-item>
        <b-dropdown-item href="#">Creator</b-dropdown-item>
        <b-dropdown-item href="#">To be aware</b-dropdown-item>
      </b-dropdown>
      <b-dropdown text="Priority" variant="primary" class="ml-2 my-3">
        <b-dropdown-item href="#">High</b-dropdown-item>
        <b-dropdown-item href="#">Medium</b-dropdown-item>
        <b-dropdown-item href="#">Low</b-dropdown-item>
      </b-dropdown>
      <b-table
        responsive
        striped
        hover
        head-variant="dark"
        :primary-key="'id'"
        :items="items"
        :fields="fields"
      >
        <template #head()="data">
          <div
            class="filters d-flex flex-column text-center align-items-center"
          >
            <span class="">{{ data.label }}</span>
            <b-button
              v-b-modal="`baseModal`"
              :data-column="data.column"
              class="btn btn-sm btn-info"
              @click="updateModalId"
            >
              Filter
            </b-button>
          </div>
        </template>
      </b-table>
    </div>
    <div class="c_table">table here</div>
    <div class="c_subcontent">subvonten</div>
    <BaseModal />
  </div>
</template>

<script>
import BaseModal from "@/components/layout/BaseModal.vue";

export default {
  components: {
    BaseModal,
  },

  data() {
    return {
      fields: [
        {
          key: "id",
          sortable: true,
        },
        {
          key: "status",
          sortable: true,
        },
        {
          key: "responsible",
          sortable: true,
        },
        {
          key: "delegatedTo",
          sortable: true,
        },
        {
          key: "deadline",
          sortable: true,
        },
        {
          key: "priority",
          sortable: true,
        },
      ],
      items: [
        {
          id: 123456,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 245213,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 278032,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 234898,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 987123,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 123876,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 876123,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 333444,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 976666,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
        {
          id: 345897,
          status: "New",
          responsible: "Macdonald",
          delegatedTo: "Tester",
          deadline: new Date(Date.now()).toISOString(),
          priority: "Low",
        },
      ],
    };
  },

  methods: {
    updateModalId(e) {
      sessionStorage.setItem("modal-data", JSON.stringify(e.target.dataset));
    },
  },
};
</script>

<style>
</style>