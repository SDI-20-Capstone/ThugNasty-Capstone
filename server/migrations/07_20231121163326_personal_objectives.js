/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('personal_objectives', table => {
      table.increments();
      table.integer('user_id').references('id').inTable('userinfo');
      table.string('objective');
      table.string('impact');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('personal_objectives', table => {
      table.dropForeign('user_id')
    })
    .then(()=> {
      return knex.schema.dropTableIfExists('personal_objectives')
    })
  };
  