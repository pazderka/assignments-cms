<template>
  <VNavigationDrawer
    fixed
    app
    clipped
    color="grey lighten-5"
    :value="getDrawerState"
  >
    <VList nav dense>
      <VListItemGroup active-class="amber darken-2 white--text">
        <VListItem to="/">
          <VListItemIcon>
            <VIcon> mdi-desktop-mac-dashboard </VIcon>
          </VListItemIcon>
          <VListItemTitle>Dashboard</VListItemTitle>
        </VListItem>
        <VListItem to="/project-base">
          <VListItemIcon>
            <VIcon>mdi-clipboard-list-outline</VIcon>
          </VListItemIcon>
          <VListItemTitle>Project Base</VListItemTitle>
        </VListItem>
        <VListItem to="/my-statistics">
          <VListItemIcon>
            <VIcon>mdi-account-star</VIcon>
          </VListItemIcon>
          <VListItemTitle>My Statistics</VListItemTitle>
        </VListItem>
      </VListItemGroup>
    </VList>
  </VNavigationDrawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SideBar",
  computed: {
    ...mapGetters("layout", ["getDrawerState"]),
  },
};
</script>
