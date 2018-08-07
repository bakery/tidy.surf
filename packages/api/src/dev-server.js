const debug = require('debug')('api:dev');

import express from 'express';
import { connect } from './index';

const port = parseInt(process.env.PORT, 10) || 3000;
const server = express();

connect(server);

server.listen(port, function serverIsRunning(err) {
  if (err) throw err
  debug(`> Ready on http://localhost:${port}`)
})
