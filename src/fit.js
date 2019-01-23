
const fitHeight = function(obj, aspect) {
  let decimal = 1 / aspect.decimal
  let orientation = obj.orientation || 'landscape'
  //reverse it (again), if in portrait
  if (orientation === 'portrait') {
    decimal = 1 / decimal
  }
  let height = obj.width * decimal
  height = Math.round(height)
  return {
    closest: aspect,
    width: obj.width,
    height: height,
    orientation: orientation,
    original: obj
  }
}

const fitWidth = function(obj, aspect) {
  let decimal = aspect.decimal
  let orientation = obj.orientation || 'landscape'
  //reverse it, if in portrait
  if (orientation === 'portrait') {
    decimal = 1 / decimal
  }
  let width = obj.height * decimal
  width = Math.round(width)
  return {
    closest: aspect,
    width: width,
    height: obj.height,
    orientation: orientation,
    original: obj
  }
}

//shorten the side that's too long
const shrink = function(obj, aspect) {
  let moveWidth = fitWidth(obj, aspect)
  //did this make our width longer?
  if (moveWidth.width > obj.width) {
    return fitHeight(obj, aspect)
  }
  return moveWidth
}


module.exports = {
  both: shrink,
  width: fitWidth,
  height: fitHeight
}
