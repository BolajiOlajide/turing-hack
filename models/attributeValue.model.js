import db from '../db';

// models
import Attribute from './attribute.model';


export default db.Model.extend({
  tableName: 'attribute_value',
  idAttribute: 'attribute_value_id',
  attribute_id: () => this.belongsTo(Attribute)
});
