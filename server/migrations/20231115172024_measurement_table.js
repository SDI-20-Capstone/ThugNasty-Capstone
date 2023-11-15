/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('measurement_table', table => {
      table.increments();
      // table.integer('measurement_table_id').references('id').inTable('measurement_table');
      table.integer('date');
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

    //   return knex.schema.alterTable('userinfo', table => {
//     table.dropForeign('organization_id')
//   })
//   .then(()=> {
    return knex.schema.dropTableIfExists('measurement_table');
  };
  