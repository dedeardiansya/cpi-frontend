<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <modal-create-mask class="my-auto mr-auto" @onCreated="onMaskCreated" />
        <div class="my-auto">Data Masker</div>
      </div>
      <table class="table table-bordered">
        <tr>
          <th class="width-210">Gambar masker</th>
          <th>Keterangan</th>
          <th class="text-center width-150">Aksi</th>
        </tr>
        <tr v-for="mask in masks" :key="mask.id">
          <td>
            <img
              v-if="mask.image"
              :src="$config.baseApiUrl + '/uploads/' + mask.image"
              width="200px"
            />
            <img
              v-else
              src="https://via.placeholder.com/200x100/f0f0f0/000000?text=Gambar masker"
              width="200px"
            />
          </td>
          <td>
            <span class="d-block"> Nama masker: {{ mask.name }} </span>
            <span class="d-block">
              Manfaat masker: {{ $getBenefit(mask.condition) }}
            </span>
            <span class="d-block"> Harga masker: Rp.{{ mask.price }} </span>
          </td>
          <td>
            <modal-edit-mask
              class="d-inline-block"
              :mask="mask"
              @onUpdated="onMaskUpdated"
            />
            <b-button
              variant="danger"
              size="sm"
              @click.prevent="deleteMask(mask.id)"
              >Hapus</b-button
            >
          </td>
        </tr>
      </table>
      <b-table
        v-if="false"
        striped
        :fields="[
          { key: 'name', label: 'Nama Masker' },
          { key: 'age', label: 'Umur' },
          { key: 'price', label: 'Harga' },
          { key: 'condition', label: 'Kondisi Kulit' },
          { key: 'action', label: 'Aksi', class: 'text-center width-150' },
        ]"
        :items="masks"
      >
        <template #thead-top="data">
          <b-tr>
            <b-th></b-th>
            <b-th colspan="4">Bobot masing-masing kriteria</b-th>
            <b-th></b-th>
          </b-tr>
        </template>
        <template #cell(action)="{ item }">
          <modal-edit-mask
            class="d-inline-block"
            :mask="item"
            @onUpdated="onMaskUpdated"
          />
          <b-button
            variant="danger"
            size="sm"
            @click.prevent="deleteMask(item.id)"
            >Hapus</b-button
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMasksPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Data Masker',
    }
  },
  async asyncData({ $axios }) {
    const masks = await $axios.$get('/masks')
    return {
      masks,
    }
  },
  methods: {
    async deleteMask(id) {
      const res = await this.$deleteConfirm(
        'Anda yakin ingin menghapus masker ini?'
      )
      if (!res) return true
      try {
        await this.$axios.$delete('/masks/' + id)
        this.masks = [...this.masks].filter((el) => el.id !== id)
      } catch (e) {
        this.$sw('Gagal menghapus masker', this.$errorMessage(e))
      }
    },
    onMaskCreated(mask) {
      this.masks = [...this.masks, mask]
    },
    onMaskUpdated(mask) {
      const masks = [...this.masks]
      this.masks = masks.map((el) => (el.id === mask.id ? mask : el))
    },
  },
}
</script>
