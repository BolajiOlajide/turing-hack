import db from '../db';


export default db.Model.extend({
  tableName: 'tax',
  idAttribute: 'tax_id',
});
