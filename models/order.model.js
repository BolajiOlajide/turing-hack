import db from '../db';


export default db.Model.extend({
  tableName: 'order',
  idAttribute: 'order_id',
});
