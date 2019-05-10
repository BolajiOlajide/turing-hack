import db from '../db';


export default db.Model.extend({
  tableName: 'custromer',
  bcrypt: { field: 'password' },
  idAttribute: 'customer_id'
});
