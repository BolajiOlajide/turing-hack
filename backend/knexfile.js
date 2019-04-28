// Update with your config settings.
const config = require('lazy-config');


const baseCfg = {
  client: 'mysql2',
  debug: false,
  pool: { min: 1, max: 2 },
  migrations: { tableName: 'knex_migrations' },
  seeds: { directory: './seeds' },
  connection: {
    host : config.db.host,
    user : config.db.user,
    password : config.db.password,
    database : config.db.name
  }
};

module.exports = {
  development: {
    ...baseCfg,
    debug: false,
  },

  production: {
    ...baseCfg,
    pool: { min: 2, max: 10 },
  }
};
