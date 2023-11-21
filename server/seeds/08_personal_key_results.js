/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('personal_key_results').del();
  await knex('personal_key_results').insert([
      {title: 'Pass ALD Exam', user_id: 1, start_date: '2023-11-25', end_date: '2023-12-05', target_value: 100, success_count: 1, fail_count: 0},
      {title: 'Run 1.5 miles in 10 minutes', user_id: 1, start_date: '2023-12-06', end_date: '2023-12-15', target_value: 90, success_count: 3, fail_count: 0},
      {title: 'Spend Quality Time with Family', user_id: 1, start_date: '2023-11-22', end_date: '2023-12-02', target_value: 10, success_count: 8, fail_count: 1},
      
      {title: 'Earn Project Management Certification', user_id: 2, start_date: '2023-12-03', end_date: '2023-12-12', target_value: 100, success_count: 1, fail_count: 0},
      {title: 'Create and Follow a Daily Schedule', user_id: 2, start_date: '2023-11-25', end_date: '2023-12-05', target_value: 80, success_count: 7, fail_count: 2},
      {title: 'Speak at a Professional Conference', user_id: 2, start_date: '2023-12-06', end_date: '2023-12-15', target_value: 1, success_count: 1, fail_count: 0},
      
      {title: 'Maintain a 3.5 GPA in Degree Program', user_id: 3, start_date: '2023-11-22', end_date: '2023-12-02', target_value: 100, success_count: 1, fail_count: 0},
      {title: 'Engage in Physical Exercise 3 Times a Week', user_id: 3, start_date: '2023-12-03', end_date: '2023-12-12', target_value: 12, success_count: 10, fail_count: 2},
      {title: 'Learn to Play a Musical Instrument', user_id: 3, start_date: '2023-11-25', end_date: '2023-12-05', target_value: 1, success_count: 0, fail_count: 1},
  ]);
};
