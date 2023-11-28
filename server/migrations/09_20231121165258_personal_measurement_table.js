/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('personal_measurement_table', table => {
      table.increments();
      table.integer('personal_key_result_id').references('id').inTable('personal_key_results');
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

      return knex.schema.alterTable('personal_measurement_table', table => {
    table.dropForeign('personal_key_result_id')
  })
  .then(()=> {
    return knex.schema.dropTableIfExists('personal_measurement_table');
  });
}
