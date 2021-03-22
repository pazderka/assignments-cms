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
            <VBtn @click="updateProfile" dark color="light-blue"
              >Update profile</VBtn
            >
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
    async updateProfile() {
      const response = await axios.post("/api/profile");
    },
  },
};
</script>

<style>
</style>