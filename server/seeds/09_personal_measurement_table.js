/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('personal_measurement_table').del();
  await knex('personal_measurement_table').insert([
      {personal_key_result_id: 1, date: 20231201, count: 100, success: true, notes: 'Successfully passed ALD exam'},
      {personal_key_result_id: 2, date: 20231210, count: 9, success: true, notes: 'Achieved 9-minute 1.5-mile run'},
      {personal_key_result_id: 3, date: 20231128, count: 8, success: true, notes: 'Quality time spent with family'},
      
      {personal_key_result_id: 4, date: 20231208, count: 100, success: true, notes: 'Earned Project Management Certification'},
      {personal_key_result_id: 5, date: 20231130, count: 7, success: true, notes: 'Successfully followed daily schedule'},
      {personal_key_result_id: 6, date: 20231210, count: 1, success: true, notes: 'Spoke at professional conference'},
      
      {personal_key_result_id: 7, date: 20231210, count: 100, success: true, notes: 'Maintained 3.5 GPA'},
      {personal_key_result_id: 8, date: 20231225, count: 10, success: true, notes: 'Engaged in physical exercise 10 times'},
      {personal_key_result_id: 9, date: 20231225, count: 0, success: false, notes: 'Encountered challenges in learning to play a musical instrument'},
  ]);
};