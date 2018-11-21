const list = [
  {
    names: ['square', '1:1', 'instagram'],
    description: 'Square',
    decimal: 1,
  },
  {
    names: ['4:3', 'fullscreen', 'four three', '1.33:1', 'ipad'],
    description: 'Traditional TVs',
    decimal: 1.333333,
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
  },
  {
    names: ['3:2', '35mm', 'photo', '1.5:1', '1.5'],
    description: '35mm photos',
    decimal: 1.5,
  },
  {
    names: ['business card', 'bank card', '1.58:1'],
    description: 'Bank Cards',
    decimal: 1.58577,
  },
  {
    names: ['golden ratio', 'golden', '1.618', '1.6:1'],
    description: 'Golden ratio',
    decimal: 1.61803,
  },
  {
    names: ['16:9', 'hdtv', 'hd', 'tv', '1.78:1', 'computer', 'iphone'],
    description: 'HD video',
    decimal: 1.77777,
  },
  {
    names: ['widescreen', '1.85:1'],
    description: 'Movie-theatres',
    decimal: 1.85,
  },
  {
    names: ['2:1', 'univisium', 'mobile', '18:9'],
    description: '2:1',
    decimal: 2,
  },
  {
    names: ['cinemascope', 'widescreen', 'wide', '2.35:1', '2.39:1'],
    description: 'Widescreen',
    decimal: 2.35,
  },
  {
    names: ['silver', '1 + √2', '2.41:1'],
    description: 'Silver ratio',
    decimal: 2.41,
  }
]

//flip it into a nice lookup hash
let lookup = {}
list.forEach((o) => {
  o.names.forEach((name) => {
    lookup[name] = o
  })
})
module.exports = {
  lookup: lookup,
  list: list
}
