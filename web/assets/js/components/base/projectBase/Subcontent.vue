<template>
  <VCard>
    <VToolbar color="light-blue" dark>
      <template v-slot:extension>
        <VTabs v-model="model" slider-color="amber darken-2">
          <VTab> Item </VTab>
          <VTab> Item </VTab>
          <VTab> Item </VTab>
        </VTabs>
      </template>
    </VToolbar>

    <VTabsItems v-model="model">
      <VTabItem>
        <VCard flat>
          <VCardText>
            <div>
              hello there
              <p>he</p>
            </div>
          </VCardText>
        </VCard>
      </VTabItem>
    </VTabsItems>
  </VCard>
</template>

<script>
export default {
  name: "Subcontent",
  data() {
    return {
      model: null,
    };
  },
};
</script>

<style>
</style>