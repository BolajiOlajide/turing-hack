const tblName = 'product_attribute';
const rawSql = `CREATE TABLE ${tblName} (
  product_id INT NOT NULL,
  attribute_value_id INT NOT NULL,
  PRIMARY KEY (product_id, attribute_value_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
