<template>
  <div>
    <b-button v-b-modal.modal-create-cpi variant="primary" size="sm"
      >Tambah Data</b-button
    >
    <b-modal
      id="modal-create-cpi"
      title="Buat data Rangking CPI"
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
          ><b-spinner small v-if="loading" /> Buat</b-button
        >
        <b-button variant="danger" @click="cancel()">Batal</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalCreateCpiRangking',
  props: {
    consumers: {
      type: Array,
      default: () => [],
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
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const cpi = await this.$axios.$post('/indexes', this.form)
        this.$emit('onCreated', cpi)
        this.$bvModal.hide('modal-create-cpi')
        this.form = {
          consumerId: null,
          age: 0,
          price: 0,
          condition: '',
        }
        this.$bvToast.toast(`Berhasil membuat data baru.`, {
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
