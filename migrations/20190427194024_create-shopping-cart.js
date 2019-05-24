const tblName = 'shopping_cart';
const rawSql = `CREATE TABLE ${tblName} (
  item_id INT NOT NULL AUTO_INCREMENT,
  cart_id CHAR(32) NOT NULL,
  product_id INT NOT NULL,
  attributes VARCHAR(1000) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  buy_now BOOL NOT NULL DEFAULT true,
  added_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (item_id),
  KEY idx_shopping_cart_cart_id (cart_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
