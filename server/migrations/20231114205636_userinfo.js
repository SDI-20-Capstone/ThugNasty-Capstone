/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('userinfo', table => {
    table.increments();
    table.string('first_name');
    table.string('last_name')
    table.string('email');
    table.string('password');
    // table.integer('organization_id').references('id').inTable('organization');
    table.string('rank');
    table.string('role');
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
    return knex.schema.dropTableIfExists('userinfo')
  
};
