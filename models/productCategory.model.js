import db from '../db';

// models
import Category from './category.model';
import Product from './product.model';


export default class ProductCategory extends db.Model {
  get tableName() { return 'product_category'; }

  get idAttribute() { return 'product_category_id'; }

  category() { this.belongsTo(Category); }

  product() { this.belongsTo(Product); }
}
