const tblName = 'attribute_value';
const colName = 'attribute_id';

exports.up = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, tbl => tbl
    .integer(colName).references('attribute.attribute_id').notNullable().alter()
  )));

exports.down = knex => knex
  .schema.hasColumn(tblName, colName)
  .then(exists => exists && (knex.schema.alterTable(tblName, (tbl) => tbl
    .integer(colName).notNullable().alter()
  )));
