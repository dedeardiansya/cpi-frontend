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
          <b-form-select
            id="age"
            v-model="form.age"
            :options="[
              { value: 4, text: '13-17' },
              { value: 5, text: '17-23' },
              { value: 6, text: '23-28' },
              { value: 7, text: '>28' },
            ]"
            :state="errors?.age ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Harga:"
          label-for="price"
          :invalid-feedback="errors?.price"
        >
          <b-form-select
            id="price"
            v-model="form.price"
            :options="[
              { value: 4, text: '<Rp.15000' },
              { value: 5, text: 'Rp.16000-Rp.25000' },
              { value: 6, text: ' Rp.26000-Rp.40000' },
              { value: 7, text: '>Rp.41000' },
            ]"
            :state="errors?.age ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Kondisi Kulit:"
          label-for="condition"
          :invalid-feedback="errors?.condition"
        >
          <b-form-select
            id="condition"
            v-model="form.condition"
            :options="[
              { value: 4, text: 'kering' },
              { value: 5, text: 'kemerahan' },
              { value: 6, text: 'iritasi' },
              { value: 7, text: 'kencang dan gatal' },
            ]"
            :state="errors?.condition ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Manfaat:"
          label-for="benefit"
          :invalid-feedback="errors?.benefit"
        >
          <b-form-select
            id="benefit"
            v-model="form.benefit"
            :options="[
              { value: 4, text: 'melembabkan kulit wajah kencang dan gatal' },
              { value: 5, text: 'menghidrasi kulit wajah kering' },
              { value: 6, text: 'menormalkan kadar minyak di wajah' },
              { value: 7, text: 'menenangkan kulit wajah iritasi' },
            ]"
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
        condition: 0,
        benefit: 0,
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
          condition: 0,
          benefit: 0,
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
