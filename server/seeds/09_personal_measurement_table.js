/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('personal_measurement_table').del();
  await knex('personal_measurement_table').insert([
      {personal_key_result_id: 1, date: 20231201, count: 100, success: true, notes: 'Successfully passed ALD exam'},
      {personal_key_result_id: 2, date: 20231120, count: 1, success: false, notes: 'Did not complete study materials'},
      {personal_key_result_id: 3, date: 20231210, count: 3, success: true, notes: 'Achieved 9-minute 1.5-mile run'},
      {personal_key_result_id: 4, date: 20231130, count: 1, success: false, notes: 'Missed target on interval training'},
      {personal_key_result_id: 4, date: 20231202, count: 2, success: true, notes: 'Successfully completed interval training'},
      {personal_key_result_id: 5, date: 20231128, count: 8, success: true, notes: 'Quality time spent with family'},
      {personal_key_result_id: 5, date: 20231122, count: 1, success: false, notes: 'Busy schedule, did not meet target'},
      {personal_key_result_id: 6, date: 20231127, count: 2, success: true, notes: 'Watched Mulan and Lilo and Stitch'},
      {personal_key_result_id: 7, date: 20231208, count: 100, success: true, notes: 'Earned Project Management Certification'},
      {personal_key_result_id: 8, date: 20231211, count: 70, success: true, notes: 'Earned Project Management Certification'},
      {personal_key_result_id: 9, date: 20231130, count: 7, success: true, notes: 'Successfully followed daily schedule'},
      {personal_key_result_id: 9, date: 20231202, count: 2, success: false, notes: 'Did not follow schedule :('},
      {personal_key_result_id: 10, date: 20231127, count: 5, success: true, notes: 'Successfully prioritize tasks and stuck to them'},
      {personal_key_result_id: 10, date: 20231128, count: 1, success: false, notes: 'Successfully prioritize tasks and stuck to them'},
      {personal_key_result_id: 11, date: 20231210, count: 1, success: true, notes: 'Spoke at professional conference'},
      {personal_key_result_id: 12, date: 20231204, count: 1, success: false, notes: 'Did not rehearse speech'},
      {personal_key_result_id: 13, date: 20231210, count: 100, success: true, notes: 'Maintained 3.5 GPA'},
      {personal_key_result_id: 14, date: 20231127, count: 1, success: false, notes: 'Did not find a tutor in time'},
      {personal_key_result_id: 15, date: 20231212, count: 10, success: true, notes: 'Engaged in physical exercise 3 times in a week'},
      {personal_key_result_id: 15, date: 20231212, count: 2, success: false, notes: 'Did not engaged in physical exercise at all'},
      {personal_key_result_id: 16, date: 20231129, count: 1, success: true, notes: 'Attended a new fitness class for yoga'},
      {personal_key_result_id: 17, date: 20231128, count: 1, success: false, notes: 'Encountered challenges in learning to play a musical instrument'},
      {personal_key_result_id: 18, date: 20231128, count: 1, success: false, notes: 'Did not take a lesson in music'},
  ]);
};