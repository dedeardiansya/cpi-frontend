<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <modal-create-cpi-rangking
          class="my-auto mr-auto"
          :consumers="consumers"
          @onCreated="onCpiCreated"
        />
        <div class="my-auto">Peringkat CPI</div>
      </div>
      <b-table
        bordered
        striped
        :fields="[
          { key: 'no', label: 'No' },
          { key: 'consumer.id', label: 'Id konsumen' },
          { key: 'consumer.name', label: 'Nama Konsumen' },
          { key: 'cpi.cpi', label: 'Hasil CPI Tertinggi' },
          { key: 'cpi.name', label: 'Nama Masker Wajah' },
          { key: 'action', label: 'Aksi', class: 'text-center width-210' },
        ]"
        :items="indexes"
      >
        <template #cell(no)="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
        <template #cell(action)="{ item }">
          <b-button
            variant="primary"
            size="sm"
            class="mr-0"
            :to="`/rangking?search=${item.consumer.id}`"
            >Show</b-button
          >
          <modal-edit-cpi-rangking
            class="d-inline-block"
            :index="item"
            :consumers="consumers.filter((el) => el.id === item.consumer.id)"
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
