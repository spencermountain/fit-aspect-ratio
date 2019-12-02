(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.fitAspect = factory());
}(this, (function () { 'use strict';

  //lists are stored in landscape orientation
  const list = [{
    names: ['square', '1:1', 'instagram'],
    description: 'Square',
    decimal: 1,
    orientation: 'landscape'
  }, {
    names: ['4:3', 'fullscreen', 'four three', '1.33:1', 'ipad', 'pythagorean'],
    description: 'Traditional TVs',
    decimal: 1.333333,
    orientation: 'landscape'
  }, {
    names: ['a4', '√2:1', 'paper', 'lichtenberg', '1:1.41'],
    description: 'A4 paper',
    decimal: 1.41
  }, {
    names: ['imax', '1.43:1'],
    description: 'IMAX film',
    decimal: 1.43,
    orientation: 'landscape'
  }, {
    names: ['3:2', '35mm', 'photo', '1.5:1', '1.5'],
    description: '35mm photos',
    decimal: 1.5,
    orientation: 'landscape'
  }, {
    names: ['business card', 'bank card', '1.58:1'],
    description: 'Bank Cards',
    decimal: 1.58577,
    orientation: 'landscape'
  }, {
    names: ['golden', 'kepler', '1.618', '1.6:1'],
    description: 'Golden ratio',
    decimal: 1.61803,
    orientation: 'landscape'
  }, {
    names: ['16:9', 'hd', 'hdtv', 'fhd', 'tv', 'computer', 'iphone', '4k', '8k', '1.78:1'],
    description: 'HD video',
    decimal: 1.77777,
    orientation: 'landscape'
  }, {
    names: ['widescreen', '1.85:1'],
    description: 'Movie-theatres',
    decimal: 1.85,
    orientation: 'landscape'
  }, {
    names: ['2:1', 'univisium', 'mobile', '18:9'],
    description: '2:1',
    decimal: 2,
    orientation: 'landscape'
  }, {
    names: ['cinemascope', 'widescreen', 'wide', '2.35:1', '2.39:1'],
    description: 'Widescreen',
    decimal: 2.35,
    orientation: 'landscape'
  }, {
    names: ['silver', '1 + √2', '2.41:1'],
    description: 'Silver ratio',
    decimal: 2.41,
    orientation: 'landscape'
  }]; //create portrait mode

  let portraits = list.map(o => {
    o = Object.assign({}, o);
    o.decimal = 1 / o.decimal;
    o.orientation = 'portrait';
    return o;
  }); // const list = portrait.concat(landscape)
  //flip it into a nice lookup hash

  let lookup = {};
  list.forEach(o => {
    o.names.forEach(name => {
      lookup[name] = o;
    });
  });
  var aspects = {
    lookup: lookup,
    portraits: portraits,
    list: list
  };

  const findLandscape = function (decimal, list) {
    for (let i = 0; i < list.length; i += 1) {
      if (decimal <= list[i].decimal) {
        //was the previous one even closer?
        if (list[i - 1]) {
          let diffThis = Math.abs(decimal - list[i].decimal);
          let diffLast = Math.abs(decimal - list[i - 1].decimal);

          if (diffLast < diffThis) {
            return list[i - 1];
          }
        }

        return list[i];
      }
    }

    return list[list.length - 1];
  }; //find the closest portrait ratio


  const findPortrait = function (decimal, list) {
    for (let i = 0; i < list.length; i += 1) {
      if (decimal > list[i].decimal) {
        //was the previous one even closer?
        if (list[i - 1]) {
          let diffThis = Math.abs(decimal - list[i].decimal);
          let diffLast = Math.abs(decimal - list[i - 1].decimal);

          if (diffLast < diffThis) {
            return list[i - 1];
          }
        }

        return list[i];
      }
    }

    return list[list.length - 1];
  }; //find the closest aspect ratio from width/height


  const findBestRatio = function (width, height) {
    let decimal = width / height; //round it to 2 decimals

    decimal = parseInt(decimal * 100, 10) / 100; //do we want a portrait or landscape aspect ratio?

    if (decimal < 1) {
      return findPortrait(decimal, aspects.portraits);
    }

    return findLandscape(decimal, aspects.list);
  };

  var findBestRatio_1 = findBestRatio;

  const isRatio = /^[0-9\.]+:[0-9\.]+$/; //determine aspect ratio from name

  const parseRatio = function (name) {
    name = name.toLowerCase();
    name = name.trim();
    name = name.replace(' ratio', '');
    name = name.replace('-', ' '); //if we know it..

    if (aspects.lookup.hasOwnProperty(name) === true) {
      return aspects.lookup[name];
    } //if it's numerical


    if (isRatio.test(name) === true) {
      let arr = name.split(':');
      let width = parseFloat(arr[0]);
      let height = parseFloat(arr[1]);
      let aspect = {
        description: 'custom',
        decimal: width / height
      };
      return aspect;
    }

    return null;
  };

  var parseRatio_1 = parseRatio;

  const fitHeight = function (obj, aspect) {
    let decimal = 1 / aspect.decimal;
    let orientation = obj.orientation || 'landscape'; //reverse it (again), if in portrait

    if (orientation === 'portrait') {
      decimal = 1 / decimal;
    }

    let height = obj.width * decimal;
    height = Math.round(height);
    return {
      closest: aspect,
      width: obj.width,
      height: height,
      orientation: orientation,
      original: obj
    };
  };

  const fitWidth = function (obj, aspect) {
    let decimal = aspect.decimal;
    let orientation = obj.orientation || 'landscape'; //reverse it, if in portrait

    if (orientation === 'portrait') {
      decimal = 1 / decimal;
    }

    let width = obj.height * decimal;
    width = Math.round(width);
    return {
      closest: aspect,
      width: width,
      height: obj.height,
      orientation: orientation,
      original: obj
    };
  }; //shorten the side that's too long


  const shrink = function (obj, aspect) {
    let moveWidth = fitWidth(obj, aspect); //did this make our width longer?

    if (moveWidth.width > obj.width) {
      return fitHeight(obj, aspect);
    }

    return moveWidth;
  };

  var fit = {
    both: shrink,
    width: fitWidth,
    height: fitHeight
  };

  //

  const fitAspect = function (obj = {}) {
    //for these numbers, calculate best ratio
    if (!obj.aspect && !obj.ratio) {
      let aspect = findBestRatio_1(obj.width, obj.height);
      let inverse = 1 / aspect.decimal;
      let height = obj.width * inverse; //calculate change %

      let change = (height - obj.height) / obj.height;
      change = parseInt(change * 1000, 10) / 10;
      height = Math.round(height);
      return {
        closest: aspect,
        percent_change: change,
        width: obj.width,
        height: height
      };
    } //lookup aspect ratio


    let aspect = parseRatio_1(obj.aspect || obj.ratio || '');

    if (aspect === null) {
      console.error('find-aspect-ratio error: Could not find a given aspect ratio.');
      return obj;
    } //shrink both to fit


    if (typeof obj.width === 'number' && typeof obj.height === 'number') {
      return fit.both(obj, aspect);
    } //determine missing height


    if (typeof obj.width === 'number') {
      return fit.height(obj, aspect);
    } //determine missing width


    if (typeof obj.height === 'number') {
      return fit.width(obj, aspect);
    } //doh


    console.error('find-aspect-ratio error: Please supply a height, width, or ratio value.');
    return obj;
  };

  var src = fitAspect;

  return src;

})));
//# sourceMappingURL=fit-aspect-ratio.js.map
