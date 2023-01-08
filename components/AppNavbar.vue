<template>
  <b-navbar toggleable="lg" type="light" class="shadow-sm bg-white">
    <b-container>
      <b-navbar-brand to="/">Rekomendasi Masker</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="font-weight-bold" to="/rangking"
            >Hasil Perankingan</b-nav-item
          >
          <b-nav-item
            v-if="$store.state.user"
            class="font-weight-bold"
            to="/admin/dashboard"
            >Dashboard</b-nav-item
          >
          <b-nav-item v-else class="font-weight-bold" to="/login"
            >Login</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  name: 'AppNavbar',
}
</script>
