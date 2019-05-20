/* eslint-disable max-len */
const tblName = 'customer';
const rawSql = `INSERT INTO ${tblName} (customer_id, name, email, password, credit_card) VALUES
(1, 'Coop Proton', 'coop@proton.com', 'jkhfdsadjhdsd', '390293093023'),
(2, 'Nicolas Cage', 'nico_cage@gmail.com', 'dsdsdsdsd', '893230930293')
`;
/* eslint-enable */

exports.seed = knex => knex(tblName).del()
  .then(() => knex.raw(rawSql));
