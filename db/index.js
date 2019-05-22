import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';

import knexConfig from '../knexfile';


const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfBcrypt);
bookshelfInstance.plugin('pagination');
bookshelfInstance.plugin('registry');
bookshelfInstance.plugin('visibility');

export default bookshelfInstance;
