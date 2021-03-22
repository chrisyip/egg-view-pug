# egg-view-pug

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Travis CI][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

egg view plugin for [pug](https://pugjs.org/).

**V2 supports pug v3 and therefore [requires node >= 10](https://pugjs.org/api/migration-v3.html)**.

## Install

```
npm i egg-view-pug --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.pug = {
  enable: true,
  package: 'egg-view-pug'
}

// {app_root}/config/config.default.js
exports.view = {
  mapping: {
    '.pug': 'pug',
  }
}

// configuration
exports.pug = {}
```

Create a pug file

```pug
//- app/view/hello.pug

extend layout/main

block header
  include partial/header

block content
  | hello #{data}
```

Render it

```js
// app/controller/CONTROLLER.js
exports = {
  async ACTION (ctx) {
    await ctx.render('hello.pug', {
      data: 'world'
    })
  }
}
```

The file will be compiled and cached, you can change `config.pug.cache = false` to disable cache, it's disable in local env by default.

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

[npm-url]: https://npmjs.org/package/egg-view-pug
[npm-image]: http://img.shields.io/npm/v/egg-view-pug.svg?style=flat-square
[daviddm-url]: https://david-dm.org/chrisyip/egg-view-pug
[daviddm-image]: http://img.shields.io/david/chrisyip/egg-view-pug.svg?style=flat-square
[travis-url]: https://travis-ci.org/chrisyip/egg-view-pug
[travis-image]: http://img.shields.io/travis/chrisyip/egg-view-pug.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/chrisyip/egg-view-pug
[codecov-image]: https://img.shields.io/codecov/c/github/chrisyip/egg-view-pug.svg?style=flat-square
