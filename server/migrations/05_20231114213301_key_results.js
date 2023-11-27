/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('key_results', table => {
    table.increments();
    table.string('title');
    table.integer('objective_id').references('id').inTable('objectives');
    table.string('start_date');
    table.string('end_date');
    table.integer('target_value')
    table.integer('success_count')
    table.integer('fail_count')
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
