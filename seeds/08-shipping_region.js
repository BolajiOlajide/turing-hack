const tblName = 'shipping_region';
const rawSql = `INSERT INTO ${tblName} (shipping_region_id, shipping_region) VALUES
(1, 'Please Select') , (2, 'US / Canada'),
(3, 'Europe'),         (4, 'Rest of World');
`;

exports.seed = knex => knex(tblName).del()
  .then(() => knex.raw(rawSql));
