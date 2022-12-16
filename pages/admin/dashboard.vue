<template>
  <div class="p-3">
    <b-row>
      <b-col md="6">
        <div class="card card-body text-center">
          <h3>{{ masks.length }}</h3>
          <p>TOTAL MASKER</p>
        </div>
      </b-col>
      <b-col md="6">
        <div class="card card-body text-center">
          <h3>{{ consumers.length }}</h3>
          <p>TOTAL KONSUMEN</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboardPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Dashboard',
    }
  },
  async asyncData({ $axios }) {
    const consumers = await $axios.$get('/consumers')
    const masks = await $axios.$get('/masks')
    return {
      consumers,
      masks,
    }
  },
}
</script>
