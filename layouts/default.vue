<template>
  <main class="bg-light">
    <header class="d-flex position-fixed w-100 bg-white shadow-sm px-3">
      <div class="d-flex w-100 my-auto">
        <nuxt-link to="/" class="d-flex text-dark text-decoration-none">
          <div class="my-auto">
            <span class="font-weight-bold">REKOMENDASI MASKER</span>
          </div>
        </nuxt-link>
        <div class="ml-auto">
          <b-button
            size="sm"
            variant="danger"
            class="font-weight-bold"
            @click="logout"
            >LOG OUT</b-button
          >
        </div>
      </div>
    </header>
    <aside class="bg-white shadow-sm position-fixed">
      <div class="w-full aside-wrapper py-3">
        <div class="px-3 text-center">
          <div class="p-3 border rounded bg-light">
            <div class="font-weight-bold lead text-capitalize">
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
              class="font-weight-bold"
              >Dashboard</b-nav-item
            >
            <b-nav-item
              to="/admin/consumers"
              active-class="active"
              class="font-weight-bold"
              >Data Konsumen</b-nav-item
            >
            <b-nav-item
              to="/admin/masks"
              active-class="active"
              class="font-weight-bold"
              >Data Masker</b-nav-item
            >
            <b-nav-item
              to="/admin/weight"
              active-class="active"
              class="font-weight-bold"
              >Data Bobot</b-nav-item
            >
            <b-nav-item
              to="/admin/cpi-rangking"
              active-class="active"
              class="font-weight-bold"
              >Peringkat CPI</b-nav-item
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
      const res = await this.$dialog.confirm({
        text: 'Anda yakin ingin keluar dari akun anda?',
        title: 'Warning!',
        actions: {
          false: 'Batal',
          true: 'Log Out',
        },
      })
      if (!res) return true
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
</style>
