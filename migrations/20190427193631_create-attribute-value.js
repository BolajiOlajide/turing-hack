const tblName = 'attribute_value';
const rawSql = `CREATE TABLE ${tblName} (
  attribute_value_id INT NOT NULL  AUTO_INCREMENT,
  attribute_id INT NOT NULL, -- The ID of the attribute
  value VARCHAR(100) NOT NULL, -- E.g. Yellow
  PRIMARY KEY (attribute_value_id),
  KEY idx_attribute_value_attribute_id (attribute_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
