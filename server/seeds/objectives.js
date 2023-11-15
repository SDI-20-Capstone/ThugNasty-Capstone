/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('objectives').del()
  await knex('objectives').insert([
    {user_id: 1, org_id: 2, title: 'Stop doing stupid', mission_impact: 'Air Superiority'},
    {user_id: 2, org_id: 1, title: 'Sempra Supra', mission_impact: 'Space Dominance'},
  ]);
};
