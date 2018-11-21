var test = require('tape');
var aspect = require('../src/index')

test('missing height', function(t) {
  var res = aspect({
    ratio: '3:4',
    width: 300
  })
  t.equal(res.height, 400, '3:4 height');

  res = aspect({
    ratio: 'hd',
    width: 1280
  })
  t.equal(res.height, 720, 'hd height');

  res = aspect({
    ratio: '3:3',
    width: 412
  })
  t.equal(res.height, 412, 'custom height');
  t.end();
});

test('missing width', function(t) {
  var res = aspect({
    ratio: '3:4',
    height: 400
  })
  t.equal(res.width, 300, '3:4 width');

  res = aspect({
    ratio: 'hd',
    height: 720
  })
  t.equal(res.width, 1280, 'hd width');

  res = aspect({
    ratio: '3:3',
    height: 412
  })
  t.equal(res.width, 412, 'custom width');
  t.end();
});

// 4:3 aspect ratio resolutions: 640×480, 800×600, 960×720, 1024×768, 1280×960, 1400×1050, 1440×1080, 1600×1200, 1856×1392, 1920×1440, and 2048×1536.
test('4:3', function(t) {
  var arr = [
    [640, 480], [800, 600], [960, 720], [1024, 768], [1280, 960], [2048, 1536]
  ]
  arr.forEach((a) => {
    let name = a.join('x')
    let res = aspect({
      ratio: '4:3',
      width: a[0]
    })
    t.equal(res.height, a[1], name + ' height');

    res = aspect({
      ratio: '4:3',
      height: a[1]
    })
    t.equal(res.width, a[0], name + ' width');
  })
  t.end();
})
// 16:10 aspect ratio resolutions: 1280×800, 1440×900, 1680×1050, 1920×1200 and 2560×1600.
// 16:9 aspect ratio resolutions: 1024×576, 1152×648, 1280×720 (HD), 1366×768, 1600×900, 1920×1080 (FHD), 2560×1440, 3840×2160 (4K), and 7680 x 4320 (8K).
test('16:10', function(t) {
  var arr = [
    [1280, 800], [1440, 900], [1680, 1050], [1920, 1200], [2560, 1600]
  ]
  arr.forEach((a) => {
    let name = a.join('x')
    let res = aspect({
      ratio: '16:10',
      width: a[0]
    })
    t.equal(res.height, a[1], name + ' height');

    res = aspect({
      ratio: '16:10',
      height: a[1]
    })
    t.equal(res.width, a[0], name + ' width');
  })
  t.end();
})
