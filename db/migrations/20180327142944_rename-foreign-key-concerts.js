
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('concerts'),

    knex.schema.createTable('concerts', (table) => {
      table.increments('id').primary();
      table.string('artist');
      table.string('date');
      table.string('time');
      table.integer('venue_id').unsigned();
      table.foreign('venue_id')
        .references('venues.id');

      table.timestamps(true, true)
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('concerts'),

    knex.schema.createTable('concerts', (table) => {
      table.increments('id').primary();
      table.string('artist');
      table.string('date');
      table.string('time');
      table.foreign('id')
        .references('venues.id')

      table.timestamps(true, true);
    })
  ]);
};
