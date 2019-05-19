const tblName = 'product_category';

exports.up = knex => knex
  .schema.createTable(tblName, tbl => {
    tbl.increments('product_category_id').primary();
    tbl.integer('product_id').references('product.product_id');
    tbl.integer('category_id').references('category.category_id');
  });

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
