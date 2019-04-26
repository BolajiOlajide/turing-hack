'use strict';
const config = require('lazy-config');
const knex = require('knex');


let cfg;

if (config.isDev) {
  cfg = require('./knexfile').development;
} else {
  cfg = require('./knexfile').production;
}

module.exports = knex(cfg);
