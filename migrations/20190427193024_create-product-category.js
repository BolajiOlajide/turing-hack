const tblName = 'product_category';

exports.up = knex => knex
  .schema.createTable(tblName, tbl => {
    tbl.integer('product_id').references('product.product_id');
    tbl.integer('category_id').references('category_id').inTable('category');
  });

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
