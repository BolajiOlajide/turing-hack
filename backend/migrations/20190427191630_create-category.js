const tblName = 'category';
const rawSql = `CREATE TABLE ${tblName} (
  category_id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(1000),
  PRIMARY KEY (category_id),
  KEY idx_category_department_id (department_id)
)`;

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
