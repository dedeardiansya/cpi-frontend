<template>
  <div>
    <header class="text-center py-3 bg-white shadow-sm mb-3">
      <h4>HASIL RANGKING</h4>
    </header>
    <b-container fluid>
      <b-row>
        <b-col md="8" class="mx-auto">
          <div class="mb-3">
            <b-input-group prepend="ID KONSUMEN" class="mt-3">
              <b-form-input v-model="form.search" />
              <b-input-group-append>
                <b-button variant="primary" @click="submit">LIHAT</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div>
            <table v-if="consumer" class="table">
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
  data() {
    return {
      error: '',
      form: {
        search: '',
      },
      consumer: null,
      cpi: [],
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
