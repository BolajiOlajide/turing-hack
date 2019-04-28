
exports.up = knex => knex
  .schema.hasColumn('customer', 'password')
  .then(exists => exists && (knex.schema.alterTable('customer', (tbl) => tbl
    .string('password', 100).notNullable().alter()
  )));

exports.down = knex => knex
  .schema.hasColumn('customer', 'password')
  .then(exists => exists && (knex.schema.alterTable('customer', (tbl) => tbl
    .string('password', 50).notNullable().alter()
  )));
