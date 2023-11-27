/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('personal_key_results', table => {
      table.increments();
      table.string('title');
      table.integer('personal_objective_id').references('id').inTable('personal_objectives');
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
    return knex.schema.alterTable('personal_key_results', table => {
      table.dropForeign('personal_objective_id')
    })
    .then(()=> {
      return knex.schema.dropTableIfExists('personal_key_results')
    })
  };
