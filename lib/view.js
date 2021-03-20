'use strict'

const pug = require('pug')
const cachedCompilers = new Map()

module.exports = class PugView {
  constructor (ctx) {
    this.config = ctx.app.config.pug
  }

  render (filename, locals, viewOptions) {
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

    try {
      return Promise.resolve(compiler(locals))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  renderString (tpl, locals, viewOptions) {
    try {
      const config = Object.assign({}, this.config, viewOptions, { fromString: true })
      return Promise.resolve(pug.compile(tpl, config)(locals))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
