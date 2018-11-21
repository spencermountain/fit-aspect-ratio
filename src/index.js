/*global self define*/
// calculates widths/heights according to common aspect ratios.
const findBestRatio = require('./find-best-ratio')
const parseRatio = require('./parse-ratio')

//
const fitAspect = function(obj = {}) {
  //for these numbers, calculate best ratio
  if (typeof obj.width === 'number' && typeof obj.height === 'number') {
    let aspect = findBestRatio(obj.width, obj.height)
    let inverse = 1 / aspect.decimal
    let height = obj.width * inverse
    //calculate change %
    let change = (height - obj.height) / obj.height
    change = parseInt(change * 1000, 10) / 10
    height = Math.round(height)
    return {
      aspect: aspect,
      percent_change: change,
      width: obj.width,
      height: height
    }
  }
  //lookup aspect ratio
  let aspect = parseRatio(obj.aspect || obj.ratio || '')
  if (aspect === null) {
    console.error('find-aspect-ratio error: Could not find a given aspect ratio.')
    return obj
  }
  //determine missing height
  if (typeof obj.width === 'number') {
    let decimal = 1 / aspect.decimal
    let orientation = obj.orientation || 'landscape'
    //reverse it (again), if in portrait
    if (orientation === 'portrait') {
      decimal = 1 / decimal
    }
    let height = obj.width * decimal
    height = Math.round(height)
    return {
      aspect: aspect,
      width: obj.width,
      height: height,
      orientation: orientation
    }
  }
  //determine missing width
  if (typeof obj.height === 'number') {
    let decimal = aspect.decimal
    let orientation = obj.orientation || 'landscape'
    //reverse it, if in portrait
    if (orientation === 'portrait') {
      decimal = 1 / decimal
    }
    let width = obj.height * decimal
    width = Math.round(width)
    return {
      aspect: aspect,
      width: width,
      height: obj.height,
      orientation: orientation
    }
  }
  //doh
  console.error('find-aspect-ratio error: Please supply a height, width, or ratio value.')
  return obj
}

//and then all-the-exports...
if (typeof self !== 'undefined') {
  self.nlp = fitAspect; // Web Worker
} else if (typeof window !== 'undefined') {
  window.nlp = fitAspect; // Browser
} else if (typeof global !== 'undefined') {
  global.nlp = fitAspect; // NodeJS
}
//don't forget amd!
if (typeof define === 'function' && define.amd) {
  define(fitAspect);
}
//then for some reason, do this too!
if (typeof module !== 'undefined') {
  module.exports = fitAspect;
}
