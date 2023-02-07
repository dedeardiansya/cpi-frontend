<template>
  <b-container>
    <div class="mb-3">
      <p class="font-weight-bold m-0">Hasil Perankingan</p>
      <b-input-group prepend="ID KONSUMEN">
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
      <table class="table table-bordered m-0" v-if="cpi.length">
        <tr>
          <th width="10">No.</th>
          <th width="210">Merk Masker Wajah</th>
          <th>Keterangan</th>
        </tr>
        <tr v-for="(item, i) in cpi" :key="item.id">
          <td>{{ i + 1 }}.</td>
          <td>
            <img
              v-if="item.image"
              :src="$config.baseApiUrl + '/uploads/' + item.image"
              width="200px"
            />
            <img
              v-else
              src="https://via.placeholder.com/200x100/f0f0f0/000000?text=Gambar masker"
              width="200px"
            />
          </td>
          <td>
            <span class="d-block"> Nama masker: {{ item.name }} </span>
            <span class="d-block">
              Manfaat masker: {{ $getBenefit(item.condition) }}
            </span>
            <span class="d-block"> Harga masker: Rp.{{ item.price }} </span>
          </td>
        </tr>
      </table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'app',
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
