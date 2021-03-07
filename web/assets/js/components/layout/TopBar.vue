<template>
  <VAppBar app dark clipped-left dense color="light-blue">
    <VAppBarNavIcon @click="toggleDrawer" />
    <VToolbarTitle>
      <RouterLink to="/" :class="$style.headerTitle">CMS</RouterLink>
    </VToolbarTitle>
    <VSpacer />
    <VBtn icon>
      <VIcon>mdi-earth</VIcon>
    </VBtn>
    <VMenu
      v-model="userMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <VBtn color="amber darken-2" dark v-bind="attrs" v-on="on">
          <VIcon>mdi-account</VIcon>
          <span>John Doe</span>
        </VBtn>
      </template>
      <VCard>
        <VList>
          <VListItem link @click="userMenu = false">
            <VListItemAction>
              <VBtn icon>
                <VIcon> mdi-logout </VIcon>
              </VBtn>
            </VListItemAction>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>

          <VListItem link @click="userMenu = false">
            <VListItemAction>
              <VBtn icon>
                <VIcon> mdi-account-cog </VIcon>
              </VBtn>
            </VListItemAction>
            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>
        </VList>
      </VCard>
    </VMenu>
  </VAppBar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userMenu: false,
    };
  },
  methods: {
    ...mapActions("layout", ["toggleDrawer"]),
  },
};
</script>

<style module lang="scss">
.headerTitle {
  color: #fff !important;
  text-decoration: none;
}
</style>