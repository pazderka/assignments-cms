<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="6">
        <VCard elevation="2">
          <VCardTitle>{{ $t("confirm_profile.title") }}</VCardTitle>
          <VCardSubtitle>
            <p>{{ $t("confirm_profile.sub_title") }}.</p>
          </VCardSubtitle>
          <VCardText>
            <VForm
              lazy-validation
              v-model="isValid"
              ref="profileVerificationForm"
            >
              <VSelect
                :rules="required_rule"
                v-model="form.office"
                required
                :label="$t('common.office')"
                :items="$OFFICES"
              />
              <VSelect
                :rules="required_rule"
                :items="managers"
                item-text="email"
                item-value="email"
                return-object
                single-line
                v-model="form.manager"
                required
                :label="$t('common.manager')"
              />
              <VSelect
                :rules="required_rule"
                :items="$DEPARTMENTS"
                v-model="form.department"
                required
                :label="$t('common.department')"
              />
              <VTextField
                :rules="required_rule"
                v-model="form.password"
                type="password"
                required
                :label="$t('confirm_profile.change_password')"
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
                  >{{ $t("common.reset") }}</VBtn
                >
                <VBtn @click="verifyProfile" dark color="light-blue">{{
                  $t("confirm_profile.verify_profile")
                }}</VBtn>
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
import { NotificationMixin, MESSAGE_TYPES } from "cms/NotificationMixin";
import { ProfileMixin } from "cms/ProfileMixin";

export default {
  mixins: [NotificationMixin, ProfileMixin],

  async created() {
    if (this.profile.msg !== "There is no profile for this user") {
      this.$router.push("/");
      return;
    }

    try {
      const managers = await axios.get(this.getManagersUrl());
      this.managers = managers.data;
    } catch (err) {
      console.error(err);
      this.notifyMessage(MESSAGE_TYPES.ERROR.text);
    }
  },

  async mounted() {
    this.$refs.profileVerificationForm.validate();
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
        const form = {
          office: this.form.office,
          password: this.form.password,
          manager: this.form.manager.email,
          department: this.form.department,
        };
        await axios.post(this.getProfileUrl(), form);
        location.reload();
      } catch (err) {
        console.error(err);
        this.notifyMessage(MESSAGE_TYPES.ERROR.text);
      }
    },
  },

  data() {
    return {
      managers: [],
      form: {
        office: null,
        manager: null,
        password: null,
        department: null,
      },
      isValid: false,
      required_rule: [(val) => !!val || this.$t("common.field_required")],
    };
  },
};
</script>
