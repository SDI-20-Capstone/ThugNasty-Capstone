/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('key_results', table => {
    table.increments();
    table.string('title');
    table.integer('objective_id').references('id').inTable('objectives');
    table.date('start_date');
    table.date('end_date');
    table.integer('target_percent')
    table.integer('target_value')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('key_results', table => {
    table.dropForeign('objective_id')
  })
  .then(()=> {
    return knex.schema.dropTableIfExists('key_results')
  })
};
