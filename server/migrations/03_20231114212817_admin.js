/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('admin', table => {
    table.increments();
    table.integer('organization_id').references('id').inTable('organization');
    table.integer('user_id').references('id').inTable('userinfo');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('admin', table => {
    table.dropForeign('organization_id')
    table.dropForeign('user_id')
  })
  .then(()=> {
    return knex.schema.dropTableIfExists('admin')
  })
};