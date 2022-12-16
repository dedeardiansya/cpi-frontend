<template>
  <div>
    <b-button
      @click="$bvModal.show('modal-edit-consumer-' + consumer.id)"
      variant="primary"
      size="sm"
      >Edit</b-button
    >
    <b-modal
      :id="'modal-edit-consumer-' + consumer.id"
      title="Edit konsumen"
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
    consumer: {
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
        name: '',
        email: '',
        phone: '',
      },
    }
  },
  mounted() {
    this.form.name = this.consumer.name || ''
    this.form.email = this.consumer.email || ''
    this.form.phone = this.consumer.phone || ''
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const consumer = await this.$axios.$put(
          '/consumers/' + this.consumer.id,
          this.form
        )
        this.$emit('onUpdated', consumer)
        this.$bvModal.hide('modal-edit-consumer-' + consumer.id)
        this.form = {
          name: consumer.name,
          email: consumer.email,
          phone: consumer.phone,
        }
        this.$bvToast.toast(`Berhasil memperbarui konsumen.`, {
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
