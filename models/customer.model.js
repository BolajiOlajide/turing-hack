import db from '../db';


export default db.Model.extend({
  tableName: 'customer',
  bcrypt: { field: 'password' },
  idAttribute: 'customer_id',
  hidden: ['password']
});
