<template>
  <div>
    <b-button v-b-modal.modal-create-mask variant="primary" size="sm"
      >Tambah Masker</b-button
    >
    <b-modal
      id="modal-create-mask"
      title="Buat Masker"
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
          label="Bobot Umur:"
          label-for="age"
          :invalid-feedback="errors?.age"
        >
          <b-form-input
            id="age"
            type="number"
            v-model="form.age"
            placeholder="Bobot Umur"
            :state="errors?.age ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Bobot Harga:"
          label-for="price"
          :invalid-feedback="errors?.price"
        >
          <b-form-input
            id="price"
            type="number"
            v-model="form.price"
            placeholder="Bobot Harga"
            :state="errors?.price ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Bobot Kondisi Kulit:"
          label-for="condition"
          :invalid-feedback="errors?.condition"
        >
          <b-form-input
            id="condition"
            type="number"
            v-model="form.condition"
            placeholder="Bobot Kondisi Kulit"
            :state="errors?.condition ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Bobot Manfaat:"
          label-for="benefit"
          :invalid-feedback="errors?.benefit"
        >
          <b-form-input
            id="benefit"
            type="number"
            v-model="form.benefit"
            placeholder="Bobot Manfaat"
            :state="errors?.benefit ? false : null"
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
  name: 'ModalCreateMask',
  data() {
    return {
      loading: false,
      errors: null,
      danger: '',
      form: {
        name: '',
        age: 0,
        price: 0,
        condition: 0,
        benefit: 0,
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const mask = await this.$axios.$post('/masks', this.form)
        this.$emit('onCreated', mask)
        this.$bvModal.hide('modal-create-mask')
        this.form = {
          name: '',
          owner: '',
          age: 0,
          price: 0,
          condition: 0,
          benefit: 0,
        }
        this.$bvToast.toast(`Berhasil membuat masker baru.`, {
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
