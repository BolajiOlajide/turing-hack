const tblName = 'audit';
const rawSql = `CREATE TABLE ${tblName} (
  audit_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  created_on DATETIME NOT NULL,
  message TEXT NOT NULL,
  code INT NOT NULL,
  PRIMARY KEY (audit_id),
  KEY idx_audit_order_id (order_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
