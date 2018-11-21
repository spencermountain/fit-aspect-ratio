/*global self define*/
// calculates widths/heights according to common aspect ratios.
const aspects = require('./aspects')
const isRatio = /^[0-9\.]+:[0-9\.]+$/

//determine aspect ratio from name
const findRatio = function(name) {
  name = name.toLowerCase()
  name = name.trim()
  name = name.replace(' ratio', '')
  name = name.replace('-', ' ')
  //if we know it..
  if (aspects.lookup.hasOwnProperty(name) === true) {
    return aspects.lookup[name]
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

//find the closest aspect ratio from width/height
const findBestRatio = function(width, height) {
  let decimal = width / height
  //round it to 2 decimals
  decimal = parseInt(decimal * 100, 10) / 100
  let list = aspects.list
  for (let i = 0; i < list.length; i += 1) {
    if (decimal <= list[i].decimal) {
      //was the previous one even closer?
      if (list[i - 1]) {
        let diffThis = Math.abs(decimal - list[i].decimal)
        let diffLast = Math.abs(decimal - list[i - 1].decimal)
        if (diffLast < diffThis) {
          return list[i - 1]
        }
      }
      return list[i]
    }
  }
  return list[list.length - 1]
}

//
const fitAspect = function(obj = {}) {
  // console.log('found: ', aspect)

  //calculate best ratio
  if (typeof obj.width === 'number' && typeof obj.height === 'number') {
    let aspect = findBestRatio(obj.width, obj.height)
    let inverse = 1 / aspect.decimal
    let height = obj.width * inverse
    height = Math.round(height)
    return {
      aspect: aspect,
      width: obj.width,
      height: height
    }
  }
  //lookup aspect ratio
  let aspect = findRatio(obj.aspect || obj.ratio || '')
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
