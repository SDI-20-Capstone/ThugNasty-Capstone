/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('organization').del()
    await knex('organization').insert([
      {name: 'SLD 30'},
      {name: '30 SFS', parent_id: 1}
    ]);
  };
  
  