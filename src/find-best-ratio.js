const aspects = require('./aspects')

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

module.exports = findBestRatio
