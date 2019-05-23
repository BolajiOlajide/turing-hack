import db from '../db';

// models
import ShippingRegion from './shippingRegion.model';


export default db.Model.extend({
  tableName: 'shipping',
  idAttribute: 'shipping_id',
  shipping_region: () => this.belongsTo(ShippingRegion, 'shipping_region_id')
});
