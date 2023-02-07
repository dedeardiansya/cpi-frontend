<template>
  <div>
    <b-button @click="onCLick" variant="primary" size="sm">Detail</b-button>
    <b-modal
      :id="'modal-show-rangking-' + cid"
      size="lg"
      body-class="p-0"
      hide-footer
      scrollable
    >
      <table v-if="consumer && show" class="table b-table mb-0">
        <tr>
          <th width="180">Nama Konsumen</th>
          <td width="10">:</td>
          <td>{{ consumer.name }}</td>
        </tr>
        <tr>
          <th>Id Konsumen</th>
          <td>:</td>
          <td>{{ consumer.id }}</td>
        </tr>
      </table>
      <table class="table table-bordered m-0" v-if="cpi.length && show">
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
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalShowRangking',
  props: {
    cid: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      cpi: [],
      consumer: null,
    }
  },
  methods: {
    async onCLick() {
      this.show = true
      this.$bvModal.show('modal-show-rangking-' + this.cid)
      try {
        const { cpi, consumer } = await this.$axios.$get('/cpi?id=' + this.cid)
        this.cpi = cpi
        this.consumer = consumer
      } catch (e) {
        this.$sw('Gagal menampilkan data', this.$errorMessage(e))
      }
    },
  },
}
</script>
