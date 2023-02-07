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
}
