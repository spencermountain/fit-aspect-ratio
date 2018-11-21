<div align="center">
  <!-- <a href="https://www.codacy.com/app/spencerkelly86/wtf_wikipedia">
    <img src="https://api.codacy.com/project/badge/grade/e84f69487c9348ba9cd8e31031a05a4f" />
  </a> -->
  <a href="https://npmjs.org/package/fit-aspect-ratio">
    <img src="https://img.shields.io/npm/v/fit-aspect-ratio.svg?style=flat-square" />
  </a>
  <!-- <a href="https://codecov.io/gh/spencermountain/wtf_wikipedia">
    <img src="https://codecov.io/gh/spencermountain/wtf_wikipedia/branch/master/graph/badge.svg" />
  </a> -->
  <div>like math? me neither!</div>
  <sub>
    by
    <a href="https://spencermountain.github.io/">Spencer Kelly</a>
  </sub>
</div>
<p></p>

<div align="center">
  calculates widths/heights according to <a href="https://en.wikipedia.org/wiki/Aspect_ratio_(image)">common ratios</a>.
  <div>what's an <b>aspect ratio</b> <i>*really*</i>?</div>
  <div><sup>well, i'm actually not quite sure.</sup></div>
  <h1>… </h1>
  <div align="center">But fitting things using math,</div>
  <div align="center">just seems to be nice</div>
  <div align="center">and nobody knows why.</div>
</div>

<h1 align="center">🌴</h1>

<div align="center">
  <code>npm i fit-aspect-ratio</code>
</div>



```js
const aspect = require('fit-aspect-ratio')

//calculate a missing width/height
aspect({ratio:'3:4', width:640})
// {width:300, height:480}

aspect({ratio:'widescreen', height:400}) // (2.35:1)
// {width:940, height:400}

//fit to the closest aspect ratio
let res = aspect({
  width: 1280,
  height: 722 // almost 1280×720 (16:9)
})
// { aspect:
//    { names: [ '16:9', 'hdtv', ... ],
//      description: 'HD video',
//      decimal: 1.77777 },
//   width: 1280,
//   height: 720
// }
```

```html
<script src="https://unpkg.com/fit-aspect-ratio/builds/fit-aspect-ratio.js"></script>
<script>
  aspect({ratio:'A4', height:372})
</script>
```

you can see the list of aspect-ratios we use [here](./src/aspects.js)

when fitting to an aspect ratio, `height` is adjusted, not width.

<h3 align="center">
  <a href="https://beta.observablehq.com/@spencermountain/aspect-ratio-finder">Demo</a>
</h3>


<h2 align="left">ok, ELI5 aspect-ratio</h2>

ratios are (typically) given as `width:height`

suppose our computer screen is `4:3`, our resolution could be `640x480`.

To calculate:
```js
// get a decimal representation
let decimal= 4/3  // 1.3333333

// this can get us our width..
width = 480 * decimal
// 640

// to get height, flip numerator/denominator
let inverse = 1/decimal // or '3/4'
height = 640 * inverse
// 480
```
this took me a good while...

MIT
