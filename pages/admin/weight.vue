<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <!-- <modal-create-weight
          class="my-auto mr-auto"
          @onCreated="onWeightCreated"
        /> -->
        <div class="my-auto">Data Bobot Kepentingan</div>
      </div>
      <b-table
        striped
        :fields="[
          { key: 'target', label: 'Nama kriteria' },
          { key: 'value', label: 'Bobot' },
          { key: 'tren', label: 'Tren' },
          // { key: 'action', label: 'Aksi', class: 'text-center width-150' },
        ]"
        :items="weight"
      >
        <template #cell(target)="{ item }">
          <span>{{ targetValue(item.target) }}</span>
        </template>
        <!-- <template #cell(action)="{ item }">
          <modal-edit-weight
            class="d-inline-block"
            :weight="item"
            @onUpdated="onWeightUpdated"
          />
          <b-button
            variant="danger"
            size="sm"
            @click.prevent="deleteWeight(item.id)"
            >Hapus</b-button
          >
        </template> -->
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
      weight: weight.sort((a,b) => {
        return a.value - b.value
      }).reverse(),
    }
  },
  methods: {
    targetValue(value) {
      switch (value) {
        case 'age':
          return 'Umur'
        case 'price':
          return 'Harga'
        case 'condition':
          return 'Kondisi Kulit'
        default:
          return ''
      }
    },
    async deleteWeight(id) {
      const res = await this.$deleteConfirm(
        'Anda yakin ingin menghapus data ini?'
      )
      if (!res) return true
      try {
        await this.$axios.$delete('/weight/' + id)
        this.weight = [...this.weight].filter((el) => el.id !== id)
      } catch (e) {
        this.$sw('Gagal menghapus data', this.$errorMessage(e))
      }
    },
    onWeightCreated(weight) {
      this.weight = [...this.weight, weight]
    },
    onWeightUpdated(data) {
      const weight = [...this.weight]
      this.weight = weight.map((el) => (el.id === data.id ? data : el))
    },
  },
}
</script>
