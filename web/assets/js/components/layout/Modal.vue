<template>
  <VRow justify="center">
    <VDialog max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <VBtn
          v-bind="attrs"
          v-on="on"
          @click="openModal"
          class="mb-5"
          small
          dark
          color="light-blue"
        >
          FILTER
        </VBtn>
      </template>
      <VCard>
        <VCardTitle>title</VCardTitle>
        <VContainer>
          <VRow>
            <VCol cols="12" sm="6" md="4">
              <VTextField v-model="value" label="Test" required> </VTextField>
            </VCol>
          </VRow>
        </VContainer>
        <VCardActions>
          <VSpacer />
          <VBtn text>Close</VBtn>
          <VBtn text @click="filter">Save</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<script>
export default {
  name: "Modal",
  props: {
    column: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      value: null,
    };
  },

  methods: {
    openModal(e) {
      e.stopImmediatePropagation();
    },

    filter() {
      this.$emit("filter", {
        column: this.column,
        value: this.value,
      });
    },
  },
};
</script>

<style>
</style>