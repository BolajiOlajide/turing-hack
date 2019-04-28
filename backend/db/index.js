'use strict';
const config = require('lazy-config');
const knex = require('knex');
const bookshelf = require('bookshelf');
const bookshelfBcrypt = require('bookshelf-bcrypt');


let knexConfig;

if (config.isDev) {
  knexConfig = require('../knexfile').development;
} else {
  knexConfig = require('../knexfile').production;
}

const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfBcrypt);

module.exports = bookshelfInstance;
