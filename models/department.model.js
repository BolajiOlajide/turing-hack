import db from '../db';


export default class Department extends db.Model {
  get tableName() { return 'department'; }

  get idAttribute() { return 'department_id'; }
}
