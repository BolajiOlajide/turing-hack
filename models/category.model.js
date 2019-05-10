import db from '../db';

// models
import Department from './department.model';


export default db.Model.extend({
  tableName: 'category',
  idAttribute: 'category_id',
  department: () => this.belongsTo(Department, 'department_id')
});
