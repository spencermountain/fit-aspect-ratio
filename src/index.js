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
    let fit = Math.abs(height / obj.height)
    fit = parseInt(fit * 100, 10) / 100
    height = Math.round(height)
    return {
      aspect: aspect,
      fit: fit,
      width: obj.width,
      height: height
    }
  }
  //lookup aspect ratio
  let aspect = parseRatio(obj.aspect || obj.ratio || '')
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
  //doh
  console.error('find-aspect-ratio error: Please supply a height, width, or ratio value')
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
