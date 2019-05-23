const tblName = 'shipping';
const colName = 'shipping_region_id';

exports.up = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
    .integer(colName).references('shipping_region.shipping_region_id').notNullable().alter()
  )));

exports.down = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
    .integer(colName).notNullable().alter()
  )));
