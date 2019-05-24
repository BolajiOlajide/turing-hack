import db from '../db';


export default db.Model.extend({
  tableName: 'order_detail',
  idAttribute: 'item_id'
});
