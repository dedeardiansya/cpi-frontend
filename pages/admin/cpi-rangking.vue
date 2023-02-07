<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <modal-create-cpi-rangking
          class="my-auto mr-auto"
          :consumers="consumers"
          @onCreated="refresh"
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
          { key: 'action', label: 'Aksi', class: 'text-center width-150' },
        ]"
        :items="indexes"
      >
        <template #cell(no)="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
        <template #cell(action)="{ item }">
          <modal-show-rangking
            v-if="item.cpi"
            class="d-inline-block"
            :cid="item.consumer.id"
          />
          <modal-edit-cpi-rangking
            class="d-inline-block"
            :index="item"
            :consumers="consumers.filter((el) => el.id === item.consumer.id)"
            @onUpdated="refresh"
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
    async refresh() {
      this.indexes = await this.$axios.$get('/indexes')
    },
  },
}
</script>
