'use strict'

const pugPlugin = require('./lib/view')

module.exports = app => {
  app.view.use('pug', pugPlugin)
}
