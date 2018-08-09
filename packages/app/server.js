/* globals __dirname: false */

const dev = process.env.NODE_ENV !== 'production';

if (dev) {
  require('dotenv').config();
}

const debug = require('debug')('app')
const path = require('path')
const express = require('express')
var compression = require('compression')
const next = require('next')
const API = require('api')
const Sitemap = require('./sitemap')

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(function whenAppIsReady() {
  const server = express()
  server.use(compression())

  API.connect(server)
  Sitemap.connect(server)

  server.get('/tides/:citySlug-:stateSlug-:countrySlug', function (req, res) {
    return app.render(
      req,
      res,
      '/tides',
      {
        citySlug: req.params.citySlug,
        countrySlug: req.params.countrySlug,
        stateSlug: req.params.stateSlug,
      },
    )
  })

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, './static', 'robots.txt'))
  })

  server.get('*', function catchAll(req, res) {
    return handle(req, res)
  })

  server.listen(port, function serverIsRunning(err) {
    if (err) throw err
    debug(`> Ready on http://localhost:${port}`)
  })

  debug('Gonna sync search index')

  // sync up search
  API.resyncAllSearchIndices().then(function () {
    debug('Search index synced OK')
  }).catch(function (error) {
    debug(`Failed to sync search index: ${error.message}`)
  })
});
