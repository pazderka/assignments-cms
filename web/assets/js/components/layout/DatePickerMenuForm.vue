<template>
  <VMenu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <VTextField
        v-model="date"
        label="Deadline"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        required
      />
    </template>
    <VDatePicker v-model="date" no-title scrollable>
      <VSpacer />
      <VBtn text color="primary" @click="menu = false"> Cancel </VBtn>
      <VBtn text color="primary" @click="$refs.menu.save(date)"> OK </VBtn>
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
};
</script>

<style>
</style>