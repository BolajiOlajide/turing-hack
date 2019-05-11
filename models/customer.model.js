import db from '../db';


export default class Customer extends db.Model {
  get tableName() { return 'customer'; }

  get bcrypt() { return { field: 'password' }; }

  get idAttribute() { return 'customer_id'; }
}
