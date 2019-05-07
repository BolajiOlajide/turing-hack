const tblName = 'attribute';
const rawSql = `CREATE TABLE ${tblName} (
  attribute_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL, -- E.g. Color, Size
  PRIMARY KEY (attribute_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
