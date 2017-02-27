'use strict'

const path = require('path')

module.exports = appInfo => {
  return {
    /**
     * @member Config#pug
     * @property {String} [basedir='${baseDir}/app/view'] - the root directory of pug files
     * @property {Boolean} [cache=true] - compiled functions are cached, only work with `ctx.render`
     * @property {Boolean} [debug=false] - output generated function body
     * @property {Boolean} [compileDebug=true] - when false no debug instrumentation is compiled
     */
    pug: {
      basedir: path.join(appInfo.baseDir, 'app/view'),
      cache: true,
      debug: false,
      compileDebug: true
    }
  }
}
