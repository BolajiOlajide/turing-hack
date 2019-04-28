const tblName = 'shipping';
const rawSql = `CREATE TABLE ${tblName} (
  shipping_id INT NOT NULL AUTO_INCREMENT,
  shipping_type VARCHAR(100)   NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL,
  shipping_region_id INT NOT NULL,
  PRIMARY KEY (shipping_id),
  KEY idx_shipping_shipping_region_id (shipping_region_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
