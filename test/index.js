'use strict'

import test from 'ava'
import $ from 'cheerio'
import path from 'path'
import request from 'supertest'
import mm from 'egg-mock'
import fs from 'mz/fs'

const fixtures = path.resolve(__dirname, 'fixtures')

let app

test.before(async t => {
  mm.env('prod')
  app = mm.app({ baseDir: 'apps/pug-view' })
  await app.ready()
})

test.after(async t => {
  await app.close()
})

test('render pug file', async t => {
  await request(app.callback()).get('/').expect('hello world').expect(200)
})

test('render with extend', async t => {
  await request(app.callback()).get('/render-with-extend').expect(200).then(res => {
    const doc = $(res.text)
    t.true(doc.is('main'))
    t.is(doc.text(), 'hello world')
  })
})

test('render with include', async t => {
  await request(app.callback()).get('/render-with-include').expect(200).then(res => {
    const doc = $(res.text)
    t.true(doc.is('header'))
    t.is(doc.text(), 'hello world')
  })
})

test('render with helper', async t => {
  await request(app.callback()).get('/render-with-helper').expect('hello world').expect(200)
})

test('render from string', async t => {
  await request(app.callback()).get('/render-string').expect('hello world').expect(200)
})

test('render with cache', async t => {
  const cacheFile = path.resolve(fixtures, 'apps/pug-view/app/view/cache.pug')

  await fs.writeFile(cacheFile, '| 1')
  await request(app.callback()).get('/cache').expect(200).then(res => t.is(res.text, '1'))

  await fs.writeFile(cacheFile, '| 2')
  await request(app.callback()).get('/cache').expect(200).then(res => t.is(res.text, '1'))
})

test('render with no cache', async t => {
  mm.env('local')
  const app = mm.app({ baseDir: 'apps/pug-view' })
  await app.ready()

  const cacheFile = path.resolve(fixtures, 'apps/pug-view/app/view/no-cache.pug')

  await fs.writeFile(cacheFile, '| 1')
  await request(app.callback()).get('/no-cache').expect(200).then(res => t.is(res.text, '1'))

  await fs.writeFile(cacheFile, '| 2')
  await request(app.callback()).get('/no-cache').expect(200).then(res => t.is(res.text, '2'))

  await app.close()
})

test('render error', async t => {
  await request(app.callback()).get('/error').expect(200).then(res => {
    t.true(res.text.includes('Cannot read property \'bar\' of undefined'))
  })
})
