<template>
  <VMenu
    v-model="datesMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <VTextField
        v-model="dates"
        label="Date"
        persistent-hint
        append-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
        clearable
        @click:clear="onInput"
      />
    </template>
    <VDatePicker clearable range v-model="dates" @change="onInput" />
  </VMenu>
</template>

<script>
export default {
  props: {
    value: {
      type: [Array, MouseEvent],
      default: () => [],
    },
  },

  data() {
    return {
      dates: [],
      datesMenu: null,
    };
  },

  methods: {
    onInput(value) {
      this.datesMenu = false;
      this.$emit("filter", value);
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(new_value) {
        this.dates = new_value;
      },
    },
  },
};
</script>

<style >
</style>