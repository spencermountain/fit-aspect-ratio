// calculates widths/heights according to common aspect ratios.
const findBestRatio = require('./find-best-ratio')
const parseRatio = require('./parse-ratio')
const fit = require('./fit')

//
const fitAspect = function(obj = {}) {
  //for these numbers, calculate best ratio
  if (!obj.aspect && !obj.ratio) {
    let aspect = findBestRatio(obj.width, obj.height)
    let inverse = 1 / aspect.decimal
    let height = obj.width * inverse
    //calculate change %
    let change = (height - obj.height) / obj.height
    change = parseInt(change * 1000, 10) / 10
    height = Math.round(height)
    return {
      closest: aspect,
      percent_change: change,
      width: obj.width,
      height: height
    }
  }
  //lookup aspect ratio
  let aspect = parseRatio(obj.aspect || obj.ratio || '')
  if (aspect === null) {
    console.error(
      'find-aspect-ratio error: Could not find a given aspect ratio.'
    )
    return obj
  }
  //shrink both to fit
  if (typeof obj.width === 'number' && typeof obj.height === 'number') {
    return fit.both(obj, aspect)
  }

  //determine missing height
  if (typeof obj.width === 'number') {
    return fit.height(obj, aspect)
  }
  //determine missing width
  if (typeof obj.height === 'number') {
    return fit.width(obj, aspect)
  }
  //doh
  console.error(
    'find-aspect-ratio error: Please supply a height, width, or ratio value.'
  )
  return obj
}

module.exports = fitAspect
