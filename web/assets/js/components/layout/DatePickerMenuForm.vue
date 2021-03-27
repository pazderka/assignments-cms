<template>
  <VMenu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <VTextField
        v-model="date"
        :label="$t('common.deadline')"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        required
      />
    </template>
    <VDatePicker @change="onChange" v-model="date" no-title scrollable>
    </VDatePicker>
  </VMenu>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    };
  },

  methods: {
    onChange(new_value) {
      this.date = new_value;
      this.menu = false;
      this.$emit("update", new_value);
    },
  },
};
</script>

<style>
</style>