import db from '../db';


export default db.Model.extend({
  tableName: 'category',
  idAttribute: 'category_id'
});
