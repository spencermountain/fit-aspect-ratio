const aspects = [
  {
    names: ['square', '1:1'],
    description: 'Square',
    width: 1,
  },
  {
    names: ['4:3', 'fullscreen', 'four three', '1.33:1'],
    description: 'Traditional tvs',
    width: 1.33,
  },
  {
    names: ['a4', '√2:1', 'paper', 'lichtenberg', '1:1.41'],
    description: 'A4 paper',
    width: 1.41,
  },
  {
    names: ['imax', '1.43:1'],
    description: 'IMAX film',
    width: 1.43,
  },
  {
    names: ['3:2', '35mm', 'photo', '1.5:1', '1.5'],
    description: '35 mm photographs',
    width: 1.5,
  },
  {
    names: ['business card', 'bank card', '1.58:1'],
    description: 'bank cards',
    width: 1.58577,
  },
  {
    names: ['golden ratio', 'golden', '1.618', '1.6:1'],
    description: 'golden ratio',
    width: 1.6180,
  },
  {
    names: ['16:9', 'hdtv', 'hd', 'tv', '1.78:1', 'computer'],
    description: 'HD video',
    width: 1.78,
  },
  {
    names: ['widescreen', '1.85:1'],
    description: 'fancy tv screens, movie-theatres',
    width: 1.85,
  },
  {
    names: ['2:1', 'univisium', 'mobile', '18:9'],
    description: '2:1',
    width: 2,
  },
  {
    names: ['cinemascope', 'widescreen', 'wide', '2.35:1', '2.39:1'],
    description: 'widescreen',
    width: 2.35,
  },
  {
    names: ['silver', '1 + √2', '2.41:1'],
    description: 'silver ratio',
    width: 2.41,
  }
]

let obj = {}
aspects.forEach((o) => {
  o.names.forEach((name) => {
    obj[name] = o
  })
})
module.exports = obj
