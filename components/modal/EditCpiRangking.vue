<template>
  <div>
    <b-button
      @click="$bvModal.show('modal-edit-index-' + index.id)"
      variant="primary"
      size="sm"
      >Edit</b-button
    >
    <b-modal
      :id="'modal-edit-index-' + index.id"
      title="Edit Rangking CPI"
      size="lg"
      no-close-on-backdrop
    >
      <div>
        <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
        <b-form-group
          label="Nama Konsumen:"
          label-for="consumerId"
          :invalid-feedback="errors?.consumerId"
        >
          <b-form-select
            id="consumerId"
            v-model="form.consumerId"
            placeholder="Nama"
            disabled
            :options="consumenOptions"
            :state="errors?.consumerId ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Umur:"
          label-for="age"
          :invalid-feedback="errors?.age"
        >
          <b-form-input
            id="age"
            type="number"
            v-model="form.age"
            placeholder="Umur"
            :state="errors?.age ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Harga:"
          label-for="price"
          :invalid-feedback="errors?.price"
        >
          <b-form-input
            id="price"
            type="number"
            v-model="form.price"
            placeholder="Harga"
            :state="errors?.price ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Kondisi Kulit:"
          label-for="condition"
          :invalid-feedback="errors?.condition"
        >
          <b-select
            id="condition"
            v-model="form.condition"
            :options="[
              { value: '', text: 'Kondisi kulit', disabled: true },
              'iritasi',
              'kemerahan',
              'kering',
              'kencang dan gatal',
            ]"
            :state="errors?.condition ? false : null"
          />
        </b-form-group>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button variant="primary" :disabled="loading" @click="submit()"
          ><b-spinner small v-if="loading" /> Simpan</b-button
        >
        <b-button variant="danger" @click="cancel()">Batal</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalEditConsumer',
  props: {
    consumers: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      errors: null,
      danger: '',
      form: {
        consumerId: null,
        age: 0,
        price: 0,
        condition: '',
      },
    }
  },
  computed: {
    consumenOptions() {
      return this.consumers.map((el) => ({ value: el.id, text: el.name }))
    },
  },
  mounted() {
    this.form.consumerId = this.index.consumerId || null
    this.form.age = this.index.age || 0
    this.form.price = this.index.price || 0
    this.form.condition = this.index.condition || ''
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const index = await this.$axios.$put(
          '/indexes/' + this.index.id,
          this.form
        )
        this.$emit('onUpdated', index)
        this.$bvModal.hide('modal-edit-index-' + index.id)
        this.form = {
          consumerId: index.consumerId,
          age: index.age,
          price: index.price,
          condition: index.condition,
        }
        this.$bvToast.toast(`Berhasil memperbarui data CPI.`, {
          variant: 'success',
          title: 'Sukses',
        })
      } catch (e) {
        const { errors } = this.$errorResponse(e)
        this.errors = errors
        if (!errors) this.danger = this.$errorMessage(e)
      }
      this.loading = false
    },
  },
}
</script>
