<template>
  <div>
    <b-button
      @click="$bvModal.show('modal-edit-mask-' + mask.id)"
      variant="primary"
      size="sm"
      >Edit</b-button
    >
    <b-modal
      :id="'modal-edit-mask-' + mask.id"
      title="Edit Masker"
      size="lg"
      no-close-on-backdrop
    >
      <div>
        <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
        <b-form-group
          label="Nama Masker:"
          label-for="name"
          :invalid-feedback="errors?.name"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Nama Masker"
            :state="errors?.name ? false : null"
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
  name: 'ModalEditMask',
  props: {
    mask: {
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
        age: 0,
        price: 0,
        condition: '',
      },
    }
  },
  mounted() {
    this.form.name = this.mask.name || ''
    this.form.age = this.mask.age || 0
    this.form.price = this.mask.price || 0
    this.form.condition = this.mask.condition || ''
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const mask = await this.$axios.$put('/masks/' + this.mask.id, this.form)
        this.$emit('onUpdated', mask)
        this.$bvModal.hide('modal-edit-mask-' + mask.id)
        this.form = {
          name: mask.name,
          age: mask.age,
          price: mask.price,
          condition: mask.condition,
        }
        this.$bvToast.toast(`Berhasil memperbarui masker.`, {
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
