const tblName = 'shopping_cart';
const colName = 'product_id';

exports.up = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
    .integer(colName).references('product.product_id').notNullable().alter()
  )));

exports.down = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
    .integer(colName).notNullable().alter()
  )));
