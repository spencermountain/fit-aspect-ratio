const aspect = require('./src')

//landscape mode 1280×720
// let res = aspect({
//   width: 1280,
//   height: 721
// })
// console.log(res)

//portrait mode 1280×720
let portrait = aspect({
  width: 1280,
  aspect: '16:9',
  orientation: 'landscape'
// height: 1282
})
console.log(portrait)
