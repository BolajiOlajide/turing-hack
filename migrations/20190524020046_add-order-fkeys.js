const tblName = 'orders';

exports.up = knex => Promise.all([
  knex
    .schema.hasColumn(tblName, 'customer_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('customer_id').references('customer.customer_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'shipping_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('shipping_id').references('shipping.shipping_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'tax_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('tax_id').references('tax.tax_id').notNullable().alter()
    )))
]);

exports.down = knex => Promise.all([
  knex
    .schema.hasColumn(tblName, 'customer_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
      .integer('customer_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'shipping_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
      .integer('shipping_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'tax_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
      .integer('tax_id').notNullable().alter()
    )))
]);
