const aspects = require('./aspects')
const isRatio = /^[0-9\.]+:[0-9\.]+$/

const findRatio = function(name) {
  name = name.toLowerCase()
  name = name.trim()
  name = name.replace(' ratio', '')
  name = name.replace('-', ' ')
  //if we know it..
  if (aspects.hasOwnProperty(name) === true) {
    return aspects[name].width
  }
  //if it's numerical
  if (isRatio.test(name) === true) {
    let arr = name.split(':')
    let width = parseFloat(arr[0])
    let height = parseFloat(arr[1])
    return width / height
  }
  return null
}

//
const fitAspect = function(obj) {
  let ratio = findRatio(obj.aspect || '')
  console.log('found :' + ratio)
  if (typeof obj.width === 'number') {
    let height = obj.width * ratio
    return {
      aspect: ratio,
      width: obj.width,
      height: height
    }
  }
  return obj
}
module.exports = fitAspect
