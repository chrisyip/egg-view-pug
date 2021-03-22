'use strict'

import test from 'ava'
import $ from 'cheerio'
import path from 'path'
import mm from 'egg-mock'
import fs from 'mz/fs'

const fixtures = path.resolve(__dirname, 'fixtures')

let app

test.before(async t => {
  mm.env('prod')
  app = mm.app({ baseDir: 'apps/pug-view' })
  await app.ready()
})

test('render pug file', async t => {
  await app.httpRequest().get('/').expect('hello world').expect(200)
})

test('render with extend', async t => {
  const res = await app.httpRequest().get('/render-with-extend').expect(200)
  const doc = $(res.text)
  t.true(doc.is('main'))
  t.is(doc.text(), 'hello world')
})

test('render with include', async t => {
  const res = await app.httpRequest().get('/render-with-include').expect(200)
  const doc = $(res.text)
  t.true(doc.is('header'))
  t.is(doc.text(), 'hello world')
})

test('render with helper', async t => {
  await app.httpRequest().get('/render-with-helper').expect('hello world').expect(200)
})

test('render from string', async t => {
  await app.httpRequest().get('/render-string').expect('hello world').expect(200)
})

test('render with cache', async t => {
  const cacheFile = path.resolve(fixtures, 'apps/pug-view/app/view/cache.pug')

  await fs.writeFile(cacheFile, '| 1')
  await app.httpRequest().get('/cache').expect(200).then(res => t.is(res.text, '1'))

  await fs.writeFile(cacheFile, '| 2')
  await app.httpRequest().get('/cache').expect(200).then(res => t.is(res.text, '1'))
})

test('render with no cache', async t => {
  mm.env('local')
  const app = mm.app({ baseDir: 'apps/pug-view' })
  await app.ready()

  const cacheFile = path.resolve(fixtures, 'apps/pug-view/app/view/no-cache.pug')

  await fs.writeFile(cacheFile, '| 1')
  await app.httpRequest().get('/no-cache').expect(200).then(res => t.is(res.text, '1'))

  await fs.writeFile(cacheFile, '| 2')
  await app.httpRequest().get('/no-cache').expect(200).then(res => t.is(res.text, '2'))
})

test('render error', async t => {
  const res = await app.httpRequest().get('/error').expect(200)
  t.true(res.text.includes('Cannot read property \'bar\' of undefined'))
})
