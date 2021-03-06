const tblName = 'order_detail';
const rawSql = `CREATE TABLE ${tblName} (
  item_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  attributes VARCHAR(1000) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (item_id),
  KEY idx_order_detail_order_id (order_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
