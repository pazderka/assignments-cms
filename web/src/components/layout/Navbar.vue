<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <router-link tag="b-navbar-brand" to="/">Project Manager</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <div v-if="isLoggedIn">
              <router-link tag="b-nav-item" to="/base/assignment-base"
                >Assignment Base</router-link
              >
            </div>
            <div v-else class="d-flex">
              <router-link tag="b-nav-item" to="/register"
                >Register</router-link
              >
              <router-link tag="b-nav-item" to="/login">Login</router-link>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  name: "Navbar",
};
</script>