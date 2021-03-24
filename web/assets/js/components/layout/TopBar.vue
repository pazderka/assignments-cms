<template>
  <VContainer>
    <VAppBar app dark clipped-left dense color="light-blue">
      <VAppBarNavIcon @click="toggleDrawer" />
      <VToolbarTitle>
        <RouterLink to="/" :class="$style.headerTitle">CMS</RouterLink>
      </VToolbarTitle>
      <VSpacer />
      <LanguagePicker />
      <VMenu
        v-model="userMenu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <VBtn color="amber darken-2" dark v-bind="attrs" v-on="on">
            <VIcon>mdi-account</VIcon>
            <span>{{ user.firstName }} {{ user.lastName }}</span>
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
              <VListItemTitle @click="logout">Logout</VListItemTitle>
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
  </VContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguagePicker from "cms/layout/LanguagePicker";

export default {
  components: {
    LanguagePicker,
  },

  data() {
    return {
      userMenu: false,
    };
  },
  methods: {
    ...mapActions("layout", ["toggleDrawer"]),
    ...mapActions("login", ["logout"]),
  },

  computed: {
    ...mapGetters("login", ["user"]),
  },
};
</script>

<style module lang="scss">
.headerTitle {
  color: #fff !important;
  text-decoration: none;
}
</style>