const tblName = 'shipping_region';
const rawSql = `CREATE TABLE ${tblName} (
  shipping_region_id INT NOT NULL AUTO_INCREMENT,
  shipping_region VARCHAR(100) NOT NULL,
  PRIMARY KEY (shipping_region_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
