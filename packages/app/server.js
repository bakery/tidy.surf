const debug = require('debug')('app');
const express = require('express');
const next = require('next');
const API = require('api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

if (dev) {
  require('dotenv').config();
}

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(function whenAppIsReady() {
  const server = express();

  API.connect(server);

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
  });

  server.get('*', function catchAll(req, res) {
    return handle(req, res)
  });

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
