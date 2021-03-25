<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="6">
        <VCard elevation="2">
          <VCardTitle>Your Profile</VCardTitle>
          <VCardSubtitle>
            <p>
              If this is your first login, please fill in information that have
              been given to you and also change your password.
            </p>
          </VCardSubtitle>
          <VCardText>
            <VForm
              lazy-validation
              v-model="isValid"
              ref="profileVerificationForm"
            >
              <VSelect
                :rules="required_rule"
                v-model="office"
                required
                label="Office"
                :items="$OFFICES"
              />
              <VSelect
                :rules="required_rule"
                :items="managers"
                item-text="email"
                item-value="email"
                return-object
                single-line
                v-model="manager"
                required
                label="Manager"
              />
              <VTextField
                :rules="required_rule"
                v-model="password"
                type="password"
                required
                label="New Password"
              />
            </VForm>
          </VCardText>
          <VCardActions>
            <VRow>
              <VCol cols="12" class="d-flex justify-space-between pb-5">
                <VBtn
                  @click="$refs.profileVerificationForm.reset()"
                  dark
                  color="amber darken-2"
                  >Reset</VBtn
                >
                <VBtn @click="verifyProfile" dark color="light-blue"
                  >Verify profile</VBtn
                >
              </VCol>
            </VRow>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  async created() {
    if (this.profile.msg !== "There is no profile for this user") {
      this.$router.push("/");
      return;
    }
    const managers = await axios.get("/api/users/manager");
    this.managers = managers.data;
  },

  async mounted() {
    this.$refs.profileVerificationForm.validate();
  },

  data() {
    return {
      managers: [],
      office: null,
      manager: null,
      password: null,
      isValid: false,
      required_rule: [(val) => !!val || this.$t("common.field_required")],
    };
  },

  computed: {
    ...mapGetters("login", ["profile"]),
  },

  methods: {
    async verifyProfile() {
      if (!this.$refs.profileVerificationForm.validate()) {
        return;
      }

      try {
        await axios.post("/api/profile", {
          office: this.office,
          teamLeader: this.manager.email,
          password: this.password,
        });
        location.reload();
      } catch (err) {
        console.error(err);
        this.$notify({
          title: "Something went wrong",
          text: "Please contact IT support",
          type: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>