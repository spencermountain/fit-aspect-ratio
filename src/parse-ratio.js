const aspects = require('./aspects')
const isRatio = /^[0-9\.]+:[0-9\.]+$/

//determine aspect ratio from name
const parseRatio = function(name) {
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
module.exports = parseRatio
