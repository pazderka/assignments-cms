<template>
  <b-modal id="baseModal" :title="columnTitle">
    <div class="d-flex" v-if="isString">
      <b-form>
        <b-form-input
          v-model="stringInput"
          placeholder="Enter filter text..."
        ></b-form-input>
      </b-form>
    </div>
    <template #modal-footer="{ ok, cancel }">
      <div class="d-flex justify-content-between w-100">
        <b-button @click="cancel()" class="btn btn-danger">Close</b-button>
        <b-button @click="ok()" class="btn btn-success">Submit</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "BaseModal",
  data() {
    return {
      columnTitle: null,
      isString: false,
      stringInput: null,
      columnType: null,
    };
  },

  mounted() {
    this.$root.$on("bv::modal::show", () => {
      this.stringInput = null;

      const { columntitle, columntype } = JSON.parse(
        sessionStorage.getItem("modal-data")
      );
      this.columnTitle = `Filter ${columntitle}`;
      this.columnType = columntype;

      columntype === "string"
        ? (this.isString = true)
        : (this.isString = false);
    });

    this.$root.$on("bv::modal::hide", (e) => {
      switch (e.trigger) {
        case "cancel":
          this.handleModalCancel();
          break;

        case "ok":
          this.handleModalOk();
          break;

        default:
          this.handleModalCancel();
          break;
      }
    });
  },

  methods: {
    handleModalCancel() {},
    handleModalOk() {},
  },
};
</script>

<style>
</style>