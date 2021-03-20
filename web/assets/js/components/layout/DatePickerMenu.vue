<template>
  <VMenu
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <VTextField
        label="test"
        append-icon="mdi-calendar"
        class="pickerMenu"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <VDatePicker />
  </VMenu>
</template>

<script>
export default {};
</script>

<style >
</style>