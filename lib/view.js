'use strict'

const pug = require('pug')
const cachedCompilers = new Map()

module.exports = class PugView {
  constructor (ctx) {
    this.config = ctx.app.config.pug
  }

  async render (filename, locals, viewOptions) {
    const config = Object.assign({}, this.config, viewOptions, { filename })

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
  }

  async renderString (tpl, locals, viewOptions) {
    const config = Object.assign({}, this.config, viewOptions, { fromString: true })
    return pug.compile(tpl, config)(locals)
  }
}
