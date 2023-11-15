/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('key_results').del()
  await knex('key_results').insert([
    {title: 'Do more with less', objective_id: 1, start_date: 111523, end_date: 112023, target_percent: '100 percent',},
    {title: 'Agile Combat Employment', objective_id: 1, start_date: 111923, end_date: 112723, target_value: 90},
    
  ]);
};
