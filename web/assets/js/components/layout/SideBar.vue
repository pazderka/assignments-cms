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
          <VListItemTitle>{{ $t("dashboard.dashboard") }}</VListItemTitle>
        </VListItem>
        <VListItem to="/project-base">
          <VListItemIcon>
            <VIcon>mdi-clipboard-list-outline</VIcon>
          </VListItemIcon>
          <VListItemTitle>{{ $t("dashboard.project_base") }}</VListItemTitle>
        </VListItem>
        <VListItem to="/employees">
          <VListItemIcon>
            <VIcon>mdi-account-group</VIcon>
          </VListItemIcon>
          <VListItemTitle>{{ $t("dashboard.employees") }}</VListItemTitle>
        </VListItem>
        <VListItem to="/my-statistics">
          <VListItemIcon>
            <VIcon>mdi-account-star</VIcon>
          </VListItemIcon>
          <VListItemTitle>{{ $t("dashboard.my_statistics") }}</VListItemTitle>
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
