import db from '../db';

// models
import Category from './category.model';
import ProductCategory from './productCategory.model';


// export default db.Model.extend({
//   tableName: 'product',
//   idAttribute: 'product_id',
//   productCategories: () => this.hasMany(ProductCategory)
// });

export default class Product extends db.Model {
  get tableName() { return 'product'; }

  get idAttribute() { return 'product_id'; }

  categories() {
    this.belongsToMany(Category, 'product_category', 'product_id', 'category_id')
      .through(ProductCategory, 'product_id', 'category_id');
  }
}
