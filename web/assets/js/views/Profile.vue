<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="6">
        <VCard elevation="2">
          <VCardTitle>Your Profile</VCardTitle>
          <VCardSubtitle>
            <p>
              If this is your first login, please fill in information that have
              been given to you.
            </p>
          </VCardSubtitle>
          <VCardText>
            <VForm>
              <VTextField v-model="office" required label="Office" />
              <VTextField v-model="teamLeader" required label="Team leader" />
            </VForm>
          </VCardText>
          <VCardActions>
            <VRow>
              <VCol cols="12" class="text-center pb-5">
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
export default {
  data() {
    return {
      office: null,
      teamLeader: null,
    };
  },

  methods: {
    async verifyProfile() {
      const response = await axios.post("/api/profile", {
        office: this.office,
        teamLeader: this.teamLeader,
      });
    },
  },
};
</script>

<style>
</style>