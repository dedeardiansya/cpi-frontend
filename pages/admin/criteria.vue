<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <div class="my-auto">Data Kriteria</div>
      </div>
      <table class="table table-bordered m-0">
        <thead>
          <tr>
            <th rowspan="2">Nama Kriteria</th>
            <th colspan="4">Nilai bobot</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Umur</th>
            <td>13 - 18</td>
            <td>18{{'<'}}</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th>Harga</th>
            <td>>Rp.35,000</td>
            <td>Rp.25,000 - Rp.35,000</td>
            <td>Rp.15,000 - Rp.25,000</td>
            <td>{{ '<' }}Rp.15,000</td>
          </tr>
          <tr>
            <th>Kondisi kulit</th>
            <td>iritasi</td>
            <td>kemerahan</td>
            <td>kering</td>
            <td>kencang dan gatal</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCriteriaPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Data Kriteria',
    }
  },
}
</script>
