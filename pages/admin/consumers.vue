<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <modal-create-consumer
          class="my-auto mr-auto"
          @onCreated="onConsumerCreated"
        />
        <div class="my-auto">Data Konsumen</div>
      </div>
      <b-table
        striped
        :fields="[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Nama' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'action', label: 'Aksi', class: 'text-center width-150' },
        ]"
        :items="consumers"
      >
        <template #cell(action)="{ item }">
          <modal-edit-consumer
            class="d-inline-block"
            :consumer="item"
            @onUpdated="onConsumerUpdated"
          />
          <b-button
            variant="danger"
            size="sm"
            @click.prevent="deleteConsumer(item.id)"
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
    return {
      consumers,
    }
  },
  methods: {
    async deleteConsumer(id) {
      const res = await this.$deleteConfirm(
        'Anda yakin ingin menghapus konsumen ini?'
      )
      if (!res) return true
      try {
        await this.$axios.$delete('/consumers/' + id)
        this.consumers = [...this.consumers].filter((el) => el.id !== id)
      } catch (e) {
        this.$sw('Gagal menghapus konsumen', this.$errorMessage(e))
      }
    },
    onConsumerCreated(consumer) {
      this.consumers = [...this.consumers, consumer]
    },
    onConsumerUpdated(consumer) {
      const consumers = [...this.consumers]
      this.consumers = consumers.map((el) =>
        el.id === consumer.id ? consumer : el
      )
    },
  },
}
</script>
