import db from '../db';

// models
import AttributeValue from './attributeValue.model';
import Product from './product.model';


export default db.Model.extend({
  tableName: 'product_attribute',
  idAttribute: ['product_id', 'attribute_value_id'],
  product_id: () => this.belongsTo(Product),
  attribute_value_id: () => this.belongsTo(AttributeValue)
});
