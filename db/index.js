import config from 'lazy-config';
import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';

import cfg from '../knexfile';


let knexConfig;

if (config.isDev) {
  knexConfig = cfg.development;
} else {
  knexConfig = cfg.production;
}

const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfBcrypt);

export default bookshelfInstance;
