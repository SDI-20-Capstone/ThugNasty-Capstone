/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('admin').del()
  await knex('admin').insert([
    {org_id: 1, user_id: 2},
    {org_id: 2, user_id: 1},
  
  ]);
};
