<template>
  <div class="home">
    <router-view></router-view>

    <b-container>
      <div>
        <b-jumbotron class="text-center mt-2">
          <template v-slot:header>
            <h1>John Doe</h1>
            <b-img
              rounded="circle"
              class="avatar"
              src="https://picsum.photos/300/150/?image=41"
              fluid
              alt="Fluid-grow image"
            ></b-img>
          </template>

          <template v-slot:lead>
            <p
              class="mt-4"
            >Hello John Doe, informations about your profile could be found below. You are free to edit them.</p>
          </template>

          <b-button variant="primary">Edit Profile</b-button>

          <hr class="my-4" />
          <h2>My Assignments</h2>

          <div>
            <b-table striped hover :items="items"></b-table>
          </div>
        </b-jumbotron>
      </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "@/router";

export default {
  data() {
    return {
      items: [
        { full_name: "Dickerson Doe", office: "Bucharest" },
        { full_name: "Larsen Jack", office: "London" },
        { full_name: "Geneva Beck", office: "Prague" },
        { full_name: "Jami Amy", office: "Oslo" }
      ]
    };
  },

  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      return router.push("/login");
    }
  },
  name: "Home"
};
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
}
</style>

