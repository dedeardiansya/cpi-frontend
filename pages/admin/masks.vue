<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <modal-create-mask class="my-auto mr-auto" @onCreated="onMaskCreated" />
        <div class="my-auto">Data Masker</div>
      </div>
      <b-table
        striped
        :fields="[
          { key: 'name', label: 'Nama Masker' },
          { key: 'age', label: 'Bobot 1' },
          { key: 'price', label: 'Bobot 2' },
          { key: 'condition', label: 'Bobot 3' },
          { key: 'benefit', label: 'Bobot 4' },
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
