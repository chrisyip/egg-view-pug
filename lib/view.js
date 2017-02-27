'use strict'

const pug = require('pug')
const Promise = require('bluebird')
const cachedCompilers = new Map()

module.exports = class PugView {
  constructor (ctx) {
    this.config = ctx.app.config.pug
  }

  render (filename, locals, viewOptions) {
    const self = this
    return Promise.try(function () {
      const config = Object.assign({}, self.config, viewOptions, { filename })

      let compiler

      if (config.cache && cachedCompilers.has(filename)) {
        compiler = cachedCompilers.get(filename)
      }

      if (!compiler) {
        compiler = pug.compileFile(filename, config)
      }

      if (config.cache) {
        cachedCompilers.set(filename, compiler)
      }

      return compiler(locals)
    })
  }

  renderString (tpl, locals, viewOptions) {
    const self = this
    return Promise.try(function () {
      const config = Object.assign({}, self.config, viewOptions, { fromString: true })
      return pug.compile(tpl, config)(locals)
    })
  }
}
