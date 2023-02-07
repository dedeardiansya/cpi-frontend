<template>
  <div>
    <b-button
      @click="$bvModal.show('modal-edit-weight-' + weight.id)"
      variant="primary"
      size="sm"
      >Edit</b-button
    >
    <b-modal
      :id="'modal-edit-weight-' + weight.id"
      title="Edit Bobot Kepentingan"
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
          <b-form-input
            id="target"
            :value="targetValue(form.target)"
            disabled
            placeholder="Target"
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
  name: 'ModalEditWeight',
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
  mounted() {
    this.form.target = this.weight.target || ''
    this.form.value = this.weight.value || 0
    this.form.tren = this.weight.tren || false
  },
  methods: {
    targetValue(value) {
      switch (value) {
        case 'age':
          return 'Bobot 1'
        case 'price':
          return 'Bobot 2'
        case 'condition':
          return 'Bobot 3'
        default:
          return ''
      }
    },
    async submit() {
      this.loading = true
      this.errors = null
      try {
        console.log(this.form)
        const weight = await this.$axios.$put(
          '/weight/' + this.weight.id,
          this.form
        )
        this.$emit('onUpdated', weight)
        this.$bvModal.hide('modal-edit-weight-' + weight.id)
        this.form = {
          target: weight.target,
          value: weight.value,
          tren: weight.tren,
        }
        this.$bvToast.toast(`Berhasil memperbarui bobot kepentingan.`, {
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
