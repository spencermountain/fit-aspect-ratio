var test = require('tape');
var aspect = require('../src/index')

test('fit-square', function(t) {
  let res = aspect({
    width: 1280,
    height: 730,
    aspect: 'square',
  })
  t.equal(res.width, 730, 'change-width')
  t.equal(res.height, 730, 'same-height')
  t.equal(res.closest.decimal, 1, 'got square')

  res = aspect({
    width: 80,
    height: 730,
    aspect: 'square',
  })
  t.equal(res.width, 80, 'same-width')
  t.equal(res.height, 80, 'changed-height')
  t.equal(res.closest.decimal, 1, 'got square')

  t.end()
})

test('fit- 16:9', function(t) {
  let res = aspect({
    width: 1280,
    height: 722,
    aspect: '16:9',
  })
  t.equal(res.width, 1280, 'change-width')
  t.equal(res.height, 720, 'same-height')
  t.equal(res.closest.description, 'HD video', 'got name')

  //do it portrait mode, too
  res = aspect({
    width: 1280,
    height: 722,
    aspect: '16:9',
    orientation: 'portrait'
  })
  t.equal(res.width, 406, 'change-width')
  t.equal(res.height, 722, 'same-height')
  t.equal(res.closest.description, 'HD video', 'got name')
  t.end()
})
