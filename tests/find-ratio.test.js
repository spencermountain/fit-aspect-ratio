var test = require('tape');
var aspect = require('../src/index')

test('find-ratio', function(t) {
  //16:9
  let res = aspect({
    width: 1280,
    height: 722
  })
  t.equal(res.closest.description, 'HD video', '16:9 found aspect');
  t.equal(res.height, 720, '16:9 changed height');
  t.equal(res.width, 1280, '16:9 width unchanged');
  //1:1
  res = aspect({
    width: 900,
    height: 900
  })
  t.equal(res.closest.description, 'Square', '1:1 found aspect');
  t.equal(res.height, 900, '1:1 changed height');
  t.equal(res.width, 900, '1:! width unchanged');
  t.end();
});

test('portrait/landscape', function(t) {
  let arr = [
    [1024, 576], [1152, 648], [1280, 720], [1366, 768], [1600, 900], [1920, 1080], [2560, 1440], [3840, 2160], [7680, 4320],

    [640, 480], [800, 600], [960, 720],

    // [1, 1],
    // [12, 12],
    // [125, 125],
    // [1252, 1252],
    // [42529, 42528],
    // [472529, 472528],

    //close ones
    [1253, 1252],
    [42529, 42522],
    [472529, 472520],
    [803, 600], [962, 720],
    [1602, 901], [1929, 1084], [2563, 1442]

  ]
  arr.forEach((a) => {
    //landscape mode 1280×720
    let landscape = aspect({
      width: a[0],
      height: a[1]
    })
    //portrait mode 1280×720
    let portrait = aspect({
      width: a[1],
      height: a[0]
    })
    let name = a.join('x')
    t.equal(landscape.closest.description, portrait.closest.description, name + ' same ratio')
    t.equal(landscape.closest.orientation, 'landscape', name + ' landscape')
    t.equal(portrait.closest.orientation, 'portrait', name + ' portrait')
    t.equal(landscape.percent_change, portrait.percent_change * -1, name + ' percent_change same')
  })
  t.end();

});
