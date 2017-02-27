'use strict'

module.exports = {
  * index (ctx) {
    yield ctx.render('index.pug', { data: 'world' })
  },

  * renderString (ctx) {
    ctx.body = yield ctx.renderString('| hello #{data}', { data: 'world' })
  },

  * renderWithExtend (ctx) {
    yield ctx.render('extend.pug', { data: 'world' })
  },

  * renderWithInclude (ctx) {
    yield ctx.render('include.pug', { data: 'world' })
  },

  * renderWithHelper (ctx) {
    yield ctx.render('helper.pug')
  },

  * cache (ctx) {
    yield ctx.render('cache.pug')
  },

  * noCache (ctx) {
    yield ctx.render('no-cache.pug')
  },

  * error (ctx) {
    try {
      yield ctx.render('error.pug')
    } catch (e) {
      ctx.body = e.message
    }
  }
}
