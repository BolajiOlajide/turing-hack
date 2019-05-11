import db from '../db';

// models
import ProductCategory from './productCategory.model';


// export default db.Model.extend({
//   tableName: 'product',
//   idAttribute: 'product_id',
//   productCategories: () => this.hasMany(ProductCategory)
// });

export default class Product extends db.Model {
  get tableName() { return 'product'; }

  get idAttribute() { return 'product_id'; }

  productCategories() { this.hasMany(ProductCategory, 'product_id'); }
}
