/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('key_results').del()
  await knex('key_results').insert([
    {title: 'Do more with less', objective_id: 1, start_date: '2023-11-15', end_date: '2023-11-20', target_value: 25, success_count: 10, fail_count: 2},
    {title: 'Agile Combat Employment', objective_id: 1, start_date: '2023-11-19', end_date: '2023-11-27', target_value: 90, success_count: 70, fail_count: 5},
  ]);
};
