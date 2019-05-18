const tblName = 'product_attribute';
const colName = 'attribute_value_id';

exports.up = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
    .integer(colName).references('attribute_value.attribute_value_id').notNullable().alter()
  )));

exports.down = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
    .integer(colName).notNullable().alter()
  )));
