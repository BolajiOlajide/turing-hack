const tblName = 'tax';
const rawSql = `INSERT INTO ${tblName} (tax_id, tax_type, tax_percentage) VALUES
(1, 'Sales Tax at 8.5%', 8.50),
(2, 'No Tax',            0.00);
`;

exports.seed = knex => knex(tblName).del()
  .then(() => knex.raw(rawSql));
