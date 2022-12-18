<template>
  <div>
    <header class="text-center py-3 bg-white shadow-sm mb-3">
      <h4 class="m-0 py-2">HASIL RANGKING MASKER</h4>
      <nuxt-link
        to="/admin/dashboard"
        class="btn btn-primary btn-sm"
        v-if="$store.state.user"
        >ADMIN DASHBOARD</nuxt-link
      >
      <nuxt-link to="/login" class="btn btn-primary px-5 btn-sm" v-else
        >LOGIN</nuxt-link
      >
    </header>
    <b-container fluid>
      <b-row>
        <b-col md="8" class="mx-auto bg-secondary">
          <div class="mb-3">
            <b-input-group prepend="ID KONSUMEN" class="mt-3">
              <b-form-input v-model="form.search" class="border-left pl-2" />
              <b-input-group-append>
                <b-button variant="primary" @click="submit">LIHAT</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div class="card shadow-sm mb-5 border-top-0">
            <table v-if="consumer" class="table b-table mb-0">
              <tr>
                <th>Nama</th>
                <td>:</td>
                <td>{{ consumer.name }}</td>
              </tr>
              <tr>
                <th>No HP</th>
                <td>:</td>
                <td>{{ consumer.phone }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>:</td>
                <td>{{ consumer.email }}</td>
              </tr>
            </table>
            <hr class="m-0" />
            <b-table
              v-if="cpi.length"
              striped
              :fields="[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Nama / Merek masker' },
                { key: 'cpi', label: 'Skor Hasil' },
              ]"
              :items="cpi"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'blank',
  head() {
    return {
      title: 'RANGKING CPI',
    }
  },
  async asyncData({ $axios, query }) {
    const { search } = query
    if (search) {
      try {
        const { cpi, consumer } = await $axios.$get('/cpi?id=' + search)
        return {
          error: '',
          cpi,
          consumer,
          form: {
            search,
          },
        }
      } catch (e) {
        //
      }
    }
    return {
      error: '',
      consumer: null,
      cpi: [],
      form: {
        search: search || '',
      },
    }
  },
  methods: {
    async submit() {
      try {
        const { cpi, consumer } = await this.$axios.$get(
          '/cpi?id=' + this.form.search
        )
        this.consumer = consumer
        this.cpi = cpi
      } catch (e) {
        this.$sw('Gagal menampilkan data', this.$errorMessage(e))
      }
    },
  },
}
</script>
