const rawSql = `CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100)   NOT NULL,
  description VARCHAR(1000),
  PRIMARY KEY  (department_id)
)`;

exports.up = knex => knex
  .schema.hasTable('department')
  .then(exists => !exists && knex.schema.raw(rawSql));

exports.down = knex => knex
  .schema.dropTableIfExists('department');
