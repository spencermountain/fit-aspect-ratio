const aspect = require('./src')

//landscape mode 1280×720
// let res = aspect({
//   width: 1280,
//   height: 721
// })
// console.log(res)

//portrait mode 1280×720
// let portrait = aspect({
//   width: 1280,
//   height: 730,
//   aspect: 'golden',
// // orientation: 'landscape'
// // height: 1282
// })
// console.log(portrait)

var res = aspect({
  ratio: '3:4',
  width: 300
})
console.log(res)
