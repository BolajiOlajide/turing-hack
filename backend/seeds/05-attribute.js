const tblName = 'attribute';
const rawSql = `INSERT INTO ${tblName} (attribute_id, name) VALUES
(1, 'Size'), (2, 'Color');
`;

exports.seed = knex => knex(tblName).del()
  .then(() => knex.raw(rawSql));
