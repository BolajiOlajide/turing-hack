import db from '../db';

// models
import Category from './category.model';
import Product from './product.model';


export default db.Model.extend({
  tableName: 'product_category',
  idAttribute: 'category_id',
  category: () => this.belongsTo(Category),
  product: () => this.belongsTo(Product)
});
