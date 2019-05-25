const tblName = 'orders';
const rawSql = `CREATE TABLE ${tblName} (
  order_id INT NOT NULL AUTO_INCREMENT,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  created_on DATETIME NOT NULL,
  shipped_on DATETIME,
  status BOOL NOT NULL  DEFAULT false,
  comments VARCHAR(255),
  customer_id INT,
  auth_code VARCHAR(50),
  reference VARCHAR(50),
  shipping_id INT,
  tax_id INT,
  PRIMARY KEY (order_id),
  KEY idx_orders_customer_id (customer_id),
  KEY idx_orders_shipping_id (shipping_id),
  KEY idx_orders_tax_id (tax_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
