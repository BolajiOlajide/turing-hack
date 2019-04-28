import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import logger from 'winston';

// import db from './db';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { isDev, app: { port: PORT } } = config;

app.get('/', (req, res) => res
  .send({ status: 'success', message: 'Sample express application' }));

if (isDev) {
  /* eslint-disable global-require */
  app.use(require('koii'));
  app.use(require('errorhandler'));
  /* eslint-enable */
}

app.listen(PORT, err => {
  if (err) {
    logger.error(err.message);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
