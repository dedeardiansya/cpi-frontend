<template>
  <div>
    <b-button v-b-modal.modal-create-weight variant="primary" size="sm"
      >Tambah Data</b-button
    >
    <b-modal
      id="modal-create-weight"
      title="Form Tambah Data Bobot Kepentingan"
      size="lg"
      no-close-on-backdrop
    >
      <div>
        <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
        <b-form-group
          label="Target:"
          label-for="target"
          :invalid-feedback="errors?.target"
        >
          <b-select
            id="target"
            v-model="form.target"
            placeholder="Target"
            :options="[
              { value: '', text: 'Target' },
              { value: 'age', text: 'Bobot 1' },
              { value: 'price', text: 'Bobot 2' },
              { value: 'condition', text: 'Bobot 3' },
            ]"
            :state="errors?.target ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Nilai:"
          label-for="value"
          :invalid-feedback="errors?.value"
        >
          <b-form-input
            id="value"
            type="number"
            v-model="form.value"
            placeholder="Nilai"
            :state="errors?.value ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Tren:"
          label-for="tren"
          :invalid-feedback="errors?.tren"
        >
          <b-form-select
            id="tren"
            :options="[
              { value: true, text: 'Positif' },
              { value: false, text: 'Negatif' },
            ]"
            v-model="form.tren"
            :state="errors?.tren ? false : null"
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
  name: 'ModalCreateWeight',
  props: {
    weight: {
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
        target: '',
        value: 0,
        tren: false,
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const weight = await this.$axios.$post('/weight/', this.form)
        this.$emit('onCreated', weight)
        this.$bvModal.hide('modal-create-weight')
        this.form = {
          target: weight.target,
          value: weight.value,
          tren: weight.tren,
        }
        this.$bvToast.toast(`Berhasil membuat bobot kepentingan.`, {
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
