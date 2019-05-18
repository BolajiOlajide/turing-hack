import db from '../db';

// models
import Department from './department.model';
import Product from './product.model';
import ProductCategory from './productCategory.model';


export default class Category extends db.Model {
  get tableName() { return 'category'; }

  get idAttribute() { return 'category_id'; }

  department() { return this.belongsTo(Department); }

  products() {
    return this.belongsToMany(Product, 'product_category', 'category_id', 'product_id')
      .through(ProductCategory, 'category_id', 'product_id');
  }
}
