/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('measurement_table').del()
    await knex('measurement_table').insert([
      {key_result_id: 1, date: 111523, count: 1, success: true, notes: 'Have a great air force day'},
      {key_result_id: 2, date: 111723, count: 1, success: false, notes: 'Have a great space force day'},

    ]);
  };