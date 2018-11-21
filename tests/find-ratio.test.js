var test = require('tape');
var aspect = require('../src/index')

test('find-ratio', function(t) {
  //16:9
  let res = aspect({
    width: 1280,
    height: 722
  })
  t.equal(res.aspect.description, 'HD video', '16:9 found aspect');
  t.equal(res.height, 720, '16:9 changed height');
  t.equal(res.width, 1280, '16:9 width unchanged');
  t.end();
});
