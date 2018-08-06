const debug = require('debug')('app');

import express from 'express';
import next from 'next';
import { connect } from './api';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

if (dev) {
  require('dotenv').config();
}

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  connect(server);

  server.get('/tides/:citySlug-:stateSlug-:countrySlug', function (req, res) {
    return app.render(
      req,
      res,
      '/tides',
      {
        citySlug: req.params.citySlug,
        countrySlug: req.params.countrySlug,
      },
    )
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    debug(`> Ready on http://localhost:${port}`)
  })
});
