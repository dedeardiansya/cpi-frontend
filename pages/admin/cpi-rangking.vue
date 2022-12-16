<template>
  <div class="p-3">
    <div class="card">
      <div class="card-header d-flex">
        <modal-create-cpi-rangking
          class="my-auto mr-auto"
          :consumers="consumers"
          @onCreated="onCpiCreated"
        />
        <div class="my-auto">Peringkat CPI</div>
      </div>
      <b-table
        striped
        :fields="[
          { key: 'consumer.id', label: 'UID' },
          { key: 'consumer.name', label: 'Nama' },
          { key: 'age', label: 'Umur' },
          { key: 'price', label: 'Harga' },
          { key: 'condition', label: 'Kondisi Kulit' },
          { key: 'benefit', label: 'Manfaat' },
          { key: 'action', label: 'Aksi', class: 'text-center width-140' },
        ]"
        :items="indexes"
      >
        <template #cell(action)="{ item }">
          <modal-edit-cpi-rangking
            class="d-inline-block"
            :index="item"
            :consumers="consumers"
            @onUpdated="onCpiUpdated"
          />
          <b-button
            variant="danger"
            size="sm"
            @click.prevent="deleteCpi(item.id)"
            >Hapus</b-button
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminConsumersPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Data Konsumen',
    }
  },
  async asyncData({ $axios }) {
    const consumers = await $axios.$get('/consumers')
    const indexes = await $axios.$get('/indexes')
    return {
      consumers,
      indexes,
    }
  },
  methods: {
    async deleteCpi(id) {
      const res = await this.$deleteConfirm(
        'Anda yakin ingin menghapus data ini?'
      )
      if (!res) return true
      try {
        await this.$axios.$delete('/indexes/' + id)
        this.indexes = [...this.indexes].filter((el) => el.id !== id)
      } catch (e) {
        this.$sw('Gagal menghapus data', this.$errorMessage(e))
      }
    },
    onCpiCreated(i) {
      const exists = this.indexes.find((el) => el.id === i.id)
      if (exists) {
        this.onCpiUpdated(i)
      } else {
        this.indexes = [...this.indexes, i]
      }
    },
    onCpiUpdated(i) {
      const indexes = [...this.indexes]
      this.indexes = indexes.map((el) => (el.id === i.id ? i : el))
    },
  },
}
</script>
