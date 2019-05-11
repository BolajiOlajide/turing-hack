import db from '../db';

// models
import Department from './department.model';


export default class Category extends db.Model {
  get tableName() { return 'category'; }

  get idAttribute() { return 'category_id'; }

  department() { return this.belongsTo(Department, 'department_id'); }
}
