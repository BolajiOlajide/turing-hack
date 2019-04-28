const tblName = 'customer';
const rawSql = `CREATE TABLE ${tblName} (
  customer_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL,
  credit_card TEXT,
  address_1 VARCHAR(100),
  address_2 VARCHAR(100),
  city VARCHAR(100),
  region VARCHAR(100),
  postal_code VARCHAR(100),
  country VARCHAR(100),
  shipping_region_id INT NOT NULL default '1',
  day_phone varchar(100),
  eve_phone varchar(100),
  mob_phone varchar(100),
  PRIMARY KEY (customer_id),
  UNIQUE KEY idx_customer_email (email),
  KEY idx_customer_shipping_region_id (shipping_region_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);