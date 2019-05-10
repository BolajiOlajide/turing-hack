import db from '../db';


export default db.Model.extend({
  tableName: 'department',
  idAttribute: 'department_id'
});
