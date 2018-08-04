import express from 'express';
import next from 'next';
import { connect } from './api';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  connect(server);

  server.get('/api', (req, res) => {
    return res.send('>>>>>>>>>>> API Callz, yo');
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});
