import db from '../db';

// models
import Product from './product.model';
import Customer from './customer.model';


export default class Review extends db.Model {
  get tableName() { return 'review'; }

  get idAttribute() { return 'review_id'; }

  product() { return this.belongsTo(Product, 'product_id'); }

  owner() { return this.belongsTo(Customer, 'customer_id'); }
}
