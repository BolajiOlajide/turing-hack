const tblName = 'order_detail';

exports.up = knex => Promise.all([
  knex
    .schema.hasColumn(tblName, 'product_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('product_id').references('product.product_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'order_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
      .integer('order_id').references('orders.order_id').notNullable().alter()
    )))
]);

exports.down = knex => Promise.all([
  knex
    .schema.hasColumn(tblName, 'product_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
      .integer('product_id').notNullable().alter()
    ))),

  knex
    .schema.hasColumn(tblName, 'order_id')
    .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
      .integer('order_id').notNullable().alter()
    )))
]);
