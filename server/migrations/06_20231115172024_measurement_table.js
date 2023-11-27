/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('measurement_table', table => {
      table.increments();
      table.integer('key_result_id').references('id').inTable('key_results');
      table.string('date');
      table.integer('count');
      table.boolean('success');
      table.string('notes');
    })
  };

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {

      return knex.schema.alterTable('measurement_table', table => {
    table.dropForeign('key_result_id')
  })
  .then(()=> {
    return knex.schema.dropTableIfExists('measurement_table');
  });
}
