
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('user_name').notNullable();
      table.string('password').notNullable();
      table.tinyint('isAdmin');
     })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };