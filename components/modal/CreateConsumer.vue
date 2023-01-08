<template>
  <div>
    <b-button v-b-modal.modal-create-consumer variant="primary" size="sm"
      >Tambah Data</b-button
    >
    <b-modal
      id="modal-create-consumer"
      title="Form Tambah Data Konsumen"
      size="lg"
      no-close-on-backdrop
    >
      <div>
        <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
        <b-form-group
          label="Nama:"
          label-for="name"
          :invalid-feedback="errors?.name"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Nama"
            :state="errors?.name ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Alamat Email:"
          label-for="email"
          :invalid-feedback="errors?.email"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            placeholder="Email"
            :state="errors?.email ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="No. HP:"
          label-for="phone"
          :invalid-feedback="errors?.phone"
        >
          <b-form-input
            id="phone"
            v-model="form.phone"
            placeholder="No. HP"
            :state="errors?.phone ? false : null"
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
  name: 'ModalCreateConsumer',
  data() {
    return {
      loading: false,
      errors: null,
      danger: '',
      form: {
        name: '',
        email: '',
        phone: '',
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const consumer = await this.$axios.$post('/consumers', this.form)
        this.$emit('onCreated', consumer)
        this.$bvModal.hide('modal-create-consumer')
        this.form = {
          name: '',
          email: '',
          phone: '',
        }
        this.$bvToast.toast(`Berhasil membuat konsumen baru.`, {
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
