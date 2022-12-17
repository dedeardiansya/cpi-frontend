<script>
export default {
  middleware: ['auth'],
  mounted() {
    return this.$router.push('/admin/dashboard')
  },
}
</script>
