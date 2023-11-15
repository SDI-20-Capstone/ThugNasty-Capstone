/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('objectives', table => {
    table.increments();
    table.integer('user_id').references('id').inTable('userinfo');
    table.integer('organization_id').references('id').inTable('organization');
    table.string('title');
    table.string('mission_impact');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('objectives', table => {
    table.dropForeign('organization_id')
    table.dropForeign('user_id')
  })
  .then(()=> {
    return knex.schema.dropTableIfExists('objectives')
  })
};
