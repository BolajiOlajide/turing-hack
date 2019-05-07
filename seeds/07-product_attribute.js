const tblName = 'product_attribute';
const rawSql = `INSERT INTO ${tblName} (product_id, attribute_value_id)
SELECT p.product_id, av.attribute_value_id
FROM   product p, attribute_value av;
`;

exports.seed = knex => knex(tblName).del()
  .then(() => knex.raw(rawSql));
