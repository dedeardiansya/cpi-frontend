export default function (ctx, inject) {
  inject('getAge', (age) => {
    if (age < 13) {
      return 0
    } else if (age <= 19) {
      return 1
    } else {
      return 2
    }
  })
  inject('getPrice', (p) => {
    if (p >= 35000) {
      return 1
    } else if (p >= 25000) {
      return 2
    } else if (p >= 15000) {
      return 3
    } else {
      return 4
    }
  })
  inject('getBenefit', (condition) => {
    switch (condition) {
      case 'iritasi':
        return 'meredakan kulit wajah iritasi'
      case 'kemerahan':
        return 'menormalkan kadar minyak wajah'
      case 'kering':
        return 'menghidrasi kulit wajah kering'
      case 'kencang dan gatal':
        return 'melembabkan kukit kencang dan gatal'
    }
  })
}
