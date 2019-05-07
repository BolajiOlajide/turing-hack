const tblName = 'tax';
const rawSql = `CREATE TABLE ${tblName} (
  tax_id INT NOT NULL AUTO_INCREMENT,
  tax_type VARCHAR(100) NOT NULL,
  tax_percentage NUMERIC(10, 2) NOT NULL,
  PRIMARY KEY (tax_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
