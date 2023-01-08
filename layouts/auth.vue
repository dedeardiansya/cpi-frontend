<template>
  <div>
    <AppNavbar />
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8 col-lg-6 mx-auto py-3">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>
