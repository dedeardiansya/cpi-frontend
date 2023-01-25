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
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Umur</th>
            <td>13 - 17</td>
            <td>17 - 23</td>
            <td>23 - 28</td>
            <td>>28</td>
          </tr>
          <tr>
            <th>Harga</th>
            <td>{{ '<' }}Rp.15000</td>
            <td>Rp.16000 - Rp.25000</td>
            <td>Rp.26000 - Rp.40000</td>
            <td>>Rp.41000</td>
          </tr>
          <tr>
            <th>Kondisi kulit</th>
            <td>kering</td>
            <td>kemerahan</td>
            <td>iritasi</td>
            <td>kencang dan gatal</td>
          </tr>
          <tr>
            <th>Manfaat</th>
            <td>melembabkan kulit wajah kencang dan gatal</td>
            <td>menghidrasi kulit wajah kering</td>
            <td>menormalkan kadar minyak di wajah</td>
            <td>menenangkan kulit wajah iritasi</td>
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
