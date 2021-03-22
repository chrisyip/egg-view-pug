'use strict'

module.exports = {
  async index (ctx) {
    await ctx.render('index.pug', { data: 'world' })
  },

  async renderString (ctx) {
    ctx.body = await ctx.renderString('| hello #{data}', { data: 'world' })
  },

  async renderWithExtend (ctx) {
    await ctx.render('extend.pug', { data: 'world' })
  },

  async renderWithInclude (ctx) {
    await ctx.render('include.pug', { data: 'world' })
  },

  async renderWithHelper (ctx) {
    await ctx.render('helper.pug')
  },

  async cache (ctx) {
    await ctx.render('cache.pug')
  },

  async noCache (ctx) {
    await ctx.render('no-cache.pug')
  },

  async error (ctx) {
    try {
      await ctx.render('error.pug')
    } catch (e) {
      ctx.body = e.message
    }
  }
}
