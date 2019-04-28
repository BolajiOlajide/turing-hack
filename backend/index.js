const express = require('express');
const config = require('lazy-config');
const knex = require('./db');


const app = express();
const { isDev, app: { port: PORT } } = config;

app.get('/', (req, res) => {
  return res.send({ status: 'success', message: 'Sample express application' });
});

if (isDev) {
  app.use(require('koii'));
}

app.listen(PORT, err => {
  if (err) console.log(err.message);
  else console.log(`Server started on port ${PORT}`);
});
