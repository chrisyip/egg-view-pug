'use strict'

module.exports = app => {
  app.get('/', 'view.index')
  app.get('/render-with-extend', 'view.renderWithExtend')
  app.get('/render-with-include', 'view.renderWithInclude')
  app.get('/render-with-helper', 'view.renderWithHelper')
  app.get('/render-string', 'view.renderString')
  app.get('/cache', 'view.cache')
  app.get('/no-cache', 'view.noCache')
  app.get('/error', 'view.error')
}
