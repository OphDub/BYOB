
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('app_name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
