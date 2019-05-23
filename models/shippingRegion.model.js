import db from '../db';


export default db.Model.extend({
  tableName: 'shipping_region',
  idAttribute: 'shipping_region_id',
});
