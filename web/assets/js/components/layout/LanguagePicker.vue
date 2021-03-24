<template>
  <VMenu>
    <template v-slot:activator="{ on, attrs }">
      <VBtn icon dark v-bind="attrs" v-on="on">
        <VIcon>mdi-earth</VIcon>
      </VBtn>
    </template>
    <VList>
      <VListItemGroup @change="updateLanguage">
        <VListItem link>
          <VListItemContent>
            <VListItemTitle>{{ $t("translations.en") }}</VListItemTitle>
          </VListItemContent>
        </VListItem>
        <VListItem link>
          <VListItemContent>
            <VListItemTitle>{{ $t("translations.cz") }}</VListItemTitle>
          </VListItemContent>
        </VListItem>
      </VListItemGroup>
    </VList>
  </VMenu>
</template>

<script>
export default {
  methods: {
    updateLanguage(new_value) {
      const lang = this.$LANGUAGES[new_value];

      if (lang !== undefined) {
        this.$root._i18n.locale = lang;
      }
    },
  },
};
</script>

<style>
</style>