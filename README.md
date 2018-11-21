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
  <b>fit-aspect-ratio</b> calculates widths/heights according to <a href="https://en.wikipedia.org/wiki/Aspect_ratio_(image)">common ratios</a>.
  <div>what's an aspect ratio <b>*really*?</b></div>
  <div><sup>well, i'm actually not quite sure.</sup></div>
  <h2>🛀 </h2>

  <div align="center">But fitting things using math,</div>
  <div align="center">just seems to be nice</div>
  <div align="center">and nobody knows why.</div>
</div>

<h1>🌴</h1>

`npm i fit-aspect-ratio`

```js
const fitRatio = require('fit-aspect-ratio')

//calculate a missing width/height
fit({ratio:'3:4', width:400})
// {width:300, height:400}
fit({ratio:'widescreen', height:400})
// {width:1200, height:400}

//fit to the closest aspect ratio
fit({width:603, height:400})
// {ratio:'3:2', width:600, height:400}
```

you can see the list of aspect-ratios we use [here](./src/aspects.js)

[Demo](https://beta.observablehq.com/@spencermountain/aspect-ratio-finder)

MIT
