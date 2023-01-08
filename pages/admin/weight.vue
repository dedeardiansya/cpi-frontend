<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <div class="my-auto">Data Bobot Kepentingan</div>
      </div>
      <b-table
        striped
        :fields="[
          { key: 'target', label: 'Nama kriteria' },
          { key: 'value', label: 'Bobot' },
          { key: 'tren', label: 'Tren' },
          { key: 'action', label: 'Aksi', class: 'text-center width-80' },
        ]"
        :items="weight"
      >
        <template #cell(action)="{ item }">
          <modal-edit-weight
            class="d-inline-block"
            :weight="item"
            @onUpdated="onWeightUpdated"
          />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminWeightPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Data Bobot Kepentingan',
    }
  },
  async asyncData({ $axios }) {
    const weight = await $axios.$get('/weight')
    return {
      weight,
    }
  },
  methods: {
    onWeightUpdated(data) {
      const weight = [...this.weight]
      this.weight = weight.map((el) => (el.id === data.id ? data : el))
    },
  },
}
</script>
