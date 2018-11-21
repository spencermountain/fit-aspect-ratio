const aspects = require('./aspects')
const isRatio = /^[0-9\.]+:[0-9\.]+$/

const findRatio = function(name) {
  name = name.toLowerCase()
  name = name.trim()
  name = name.replace(' ratio', '')
  name = name.replace('-', ' ')
  //if we know it..
  if (aspects.hasOwnProperty(name) === true) {
    return aspects[name]
  }
  //if it's numerical
  if (isRatio.test(name) === true) {
    let arr = name.split(':')
    let width = parseFloat(arr[0])
    let height = parseFloat(arr[1])
    let aspect = {
      description: 'custom',
      decimal: width / height
    }
    return aspect
  }
  return null
}

//
const fitAspect = function(obj) {
  let aspect = findRatio(obj.aspect || obj.ratio || '')
  // console.log('found: ', aspect)

  if (typeof obj.width === 'number') {
    let inverse = 1 / aspect.decimal
    let height = obj.width * inverse
    height = Math.round(height)
    return {
      aspect: aspect,
      width: obj.width,
      height: height
    }
  }
  if (typeof obj.height === 'number') {
    let width = obj.height * aspect.decimal
    width = Math.round(width)
    return {
      aspect: aspect,
      width: width,
      height: obj.height
    }
  }
  return obj
}
module.exports = fitAspect
