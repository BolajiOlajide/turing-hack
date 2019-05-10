import db from '../db';

// models
import ProductCategory from './productCategory.model';


export default db.Model.extend({
  tableName: 'product',
  idAttribute: 'product_id',
  productCategories: () => this.hasMany(ProductCategory)
});
