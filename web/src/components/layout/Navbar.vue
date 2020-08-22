<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link tag="b-navbar-brand" to="/">Assignment Base</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link tag="b-nav-item" to="/register">Register</router-link>
          <router-link tag="b-nav-item" to="/login">Login</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>