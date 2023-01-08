<template>
  <main class="bg-secondary">
    <header class="d-flex position-fixed w-100 bg-white shadow-sm px-3">
      <div class="d-flex w-100 my-auto">
        <nuxt-link to="/" class="d-flex text-dark text-decoration-none">
          <div class="my-auto">
            <span class="font-weight-bold">REKOMENDASI MASKER</span>
          </div>
        </nuxt-link>
        <div class="ml-auto">
          <b-button variant="danger" class="font-weight-bold" @click="logout"
            >LOG OUT</b-button
          >
        </div>
      </div>
    </header>
    <aside class="bg-white shadow-sm position-fixed">
      <div class="w-full aside-wrapper py-3">
        <div class="px-3 text-center">
          <div class="p-3 border rounded bg-secondary">
            <div class="font-weight-bold lead mt-0 text-capitalize">
              {{ $store.state.user.name }}
            </div>
            <div class="text-muted small">{{ $store.state.user.email }}</div>
          </div>
        </div>
        <div class="p-3">
          <b-nav vertical pills>
            <b-nav-item
              to="/admin/dashboard"
              exact-active-class="active"
              class="font-weight-bold pr-0 sidebar-nav-list"
              >Dashboard</b-nav-item
            >
            <b-nav-item
              to="/admin/consumers"
              active-class="active"
              class="font-weight-bold pr-0 sidebar-nav-list"
              >Data Konsumen</b-nav-item
            >
            <b-nav-item-dropdown
              id="master-data-dropdown"
              text="Master Data"
              toggle-class="font-weight-bold sidebar-dropdown-toggle"
              class="pr-0 d-block sidebar-dropdown"
              menu-class="sidebar-dropdown-menu"
            >
              <b-dropdown-item to="/admin/masks">Data kriteria</b-dropdown-item>
              <b-dropdown-item to="/admin/weight"
                >Data Bobot Kepentingan</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item
              to="/admin/cpi-rangking"
              active-class="active"
              class="font-weight-bold pr-0 sidebar-nav-list"
              >Perankingan CPI</b-nav-item
            >
          </b-nav>
        </div>
      </div>
    </aside>
    <nuxt />
  </main>
</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    async logout() {
      const { isConfirmed } = await this.$swal({
        title: 'Anda yakin ingin keluar dari akun anda?',
        icon: 'question',
        cancelButtonColor: '#007bff',
        confirmButtonColor: '#dc3545',
        cancelButtonText: 'Batal',
        showCancelButton: true,
        confirmButtonText: 'Ya, Keluar',
      })
      if (!isConfirmed) return true
      this.$store.commit('removeToken')
      window.location.reload()
    },
  },
}
</script>

<style scoped>
main {
  min-height: 100vh;
  padding-left: 260px;
  padding-top: 60px;
}
header {
  z-index: 999;
  height: 60px;
  top: 0;
  left: 0;
}
aside {
  height: 100vh;
  width: 260px;
  padding-top: 60px;
  z-index: 800;
  top: 0;
  left: 0;
}
.aside-wrapper {
  height: calc(100vh - 60px);
  overflow-y: scroll;
}
.sidebar-dropdown {
  z-index: initial !important;
}
.sidebar-nav-list {
  position: relative;
}
</style>
<style>
.sidebar-dropdown-menu {
  position: relative !important;
  transform: none !important;
  width: 100%;
}
.sidebar-dropdown-toggle::after {
  position: absolute;
  top: 20px;
  right: 10px;
}
</style>
