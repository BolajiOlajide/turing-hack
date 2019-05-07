import config from 'lazy-config';
import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';

import knexConfig from '../knexfile';


const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfBcrypt);

export default bookshelfInstance;
