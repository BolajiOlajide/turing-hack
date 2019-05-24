import db from '../db';

// models
import Product from './product.model';


export default db.Model.extend({
  tableName: 'shopping_cart',
  idAttribute: 'item_id',
  product: () => this.belongsTo(Product, 'product_id')
});
