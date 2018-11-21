//lists are stored in landscape orientation
const list = [
  {
    names: ['square', '1:1', 'instagram'],
    description: 'Square',
    decimal: 1,
    orientation: 'landscape'
  },
  {
    names: ['4:3', 'fullscreen', 'four three', '1.33:1', 'ipad', 'pythagorean'],
    description: 'Traditional TVs',
    decimal: 1.333333,
    orientation: 'landscape'
  },
  {
    names: ['a4', '√2:1', 'paper', 'lichtenberg', '1:1.41'],
    description: 'A4 paper',
    decimal: 1.41,
  },
  {
    names: ['imax', '1.43:1'],
    description: 'IMAX film',
    decimal: 1.43,
    orientation: 'landscape'
  },
  {
    names: ['3:2', '35mm', 'photo', '1.5:1', '1.5'],
    description: '35mm photos',
    decimal: 1.5,
    orientation: 'landscape'
  },
  {
    names: ['business card', 'bank card', '1.58:1'],
    description: 'Bank Cards',
    decimal: 1.58577,
    orientation: 'landscape'
  },
  {
    names: ['golden', 'kepler', '1.618', '1.6:1'],
    description: 'Golden ratio',
    decimal: 1.61803,
    orientation: 'landscape'
  },
  {
    names: ['16:9', 'hd', 'hdtv', 'fhd', 'tv', 'computer', 'iphone', '4k', '8k', '1.78:1'],
    description: 'HD video',
    decimal: 1.77777,
    orientation: 'landscape'
  },
  {
    names: ['widescreen', '1.85:1'],
    description: 'Movie-theatres',
    decimal: 1.85,
    orientation: 'landscape'
  },
  {
    names: ['2:1', 'univisium', 'mobile', '18:9'],
    description: '2:1',
    decimal: 2,
    orientation: 'landscape'
  },
  {
    names: ['cinemascope', 'widescreen', 'wide', '2.35:1', '2.39:1'],
    description: 'Widescreen',
    decimal: 2.35,
    orientation: 'landscape'
  },
  {
    names: ['silver', '1 + √2', '2.41:1'],
    description: 'Silver ratio',
    decimal: 2.41,
    orientation: 'landscape'
  }
]
//create portrait mode
let portraits = list.map((o) => {
  o = Object.assign({}, o)
  o.decimal = 1 / o.decimal
  o.orientation = 'portrait'
  return o
})
// const list = portrait.concat(landscape)

//flip it into a nice lookup hash
let lookup = {}
list.forEach((o) => {
  o.names.forEach((name) => {
    lookup[name] = o
  })
})
module.exports = {
  lookup: lookup,
  portraits: portraits,
  list: list
}
