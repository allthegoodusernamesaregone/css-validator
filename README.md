# css-validator [![Build status](https://travis-ci.org/twolfson/css-validator.png?branch=master)](https://travis-ci.org/twolfson/css-validator)

Validate CSS via [W3C's service][jigsaw]

[jigsaw]: http://jigsaw.w3.org/css-validator/

This was created to validate CSS inside of the [json2css][] test suite.

[json2css]: https://github.com/twolfson/json2css

## Getting Started
Install the module with: `npm install css-validator`

```js
var validateCss = require('css-validator');
validateCss({text: 'a { color: blue; }'}, function (err, data) {
  assert.strictEqual(data.validity, true);
  assert.deepEqual(data.errors, []);
  assert.deepEqual(data.warnings, []);
});
```

## Documentation
`css-validator` returns a single function as its `module.exports`

### `validateCss(options, cb)`
Validate CSS against [W3C's Jigsaw validation service][jigsaw]

- options `String|Object` - If `options` is a `String`, it will be treated as `options.text`
    - w3cUrl `String` - URL to validate against. Default is http://jigsaw.w3.org/css-validator/validator
    - The following options from the validator itself
        - Reference: http://jigsaw.w3.org/css-validator/manual.html#api
    - uri `String` - URL of document to validate. CSS and HTML documents are allowed
    - text `String` - CSS to validate
    - usermedium `String` - Medium where the CSS will be used (e.g. `screen`, `print`, `braille`). Default is `all`.
    - profile `String` - CSS profile to use for validation. Default is `css3`.
        - Possible values are
         `css1`, `css2`, `css21`, `css3`, `svg`, `svgbasic`, `svgtiny`, `mobile`, `atsc-tv`, `tv`, `none`
    - lang `String` - Language to use in response. Default is `en`
        - Possible values are `en`, `fr`, `it`, `ko`, `ja`, `es`, `zh-cn`, `nl`, `de`, `it`, `pl`
    - warning `Number|String` - Warning level to set. Default is `2`
        - If set to `no`, no warnings will be returned
        - If set to `0`, less warnings will be returned
        - If set to `1` or `2`, more warnings will be returned

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Nov 27 2013, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
