const aspect = require('./src')

//landscape mode 1280×720
// let res = aspect({
//   width: 1280,
//   height: 721
// })
// console.log(res)

//portrait mode 1280×720
let res = aspect({
  width: 1280,
  height: 722,
  aspect: '16:9',
  orientation: 'portrait'
})
console.log(res)
