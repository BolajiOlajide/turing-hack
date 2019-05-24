const tblName = 'review';

exports.up = knex => Promise.all([
  knex
    .schema.hasColumn(tblName, 'customer_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('customer_id').references('customer.customer_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'product_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('product_id').references('product.product_id').notNullable().alter()
    )))
]);

exports.down = knex => Promise.all([
  knex
    .schema.hasColumn(tblName, 'customer_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
      .integer('customer_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'product_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('product_id').notNullable().alter()
    )))
]);
