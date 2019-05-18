import db from '../db';


export default db.Model.extend({
  tableName: 'attribute',
  idAttribute: 'attribute_id',
});
