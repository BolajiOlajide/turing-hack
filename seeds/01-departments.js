/* eslint-disable max-len */
const tblName = 'department';
const rawSql = `INSERT INTO department (department_id, name, description) VALUES
(1, 'Regional', 'Proud of your country? Wear a T-shirt with a national symbol stamp!'),
(2, 'Nature', 'Find beautiful T-shirts with animals and flowers in our Nature department!'),
(3, 'Seasonal', 'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.');
`;
/* eslint-enable */

exports.seed = knex => knex(tblName).del()
  .then(() => knex.raw(rawSql));
