/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('personal_objectives').del();
  await knex('personal_objectives').insert([
      {user_id: 1, objective: 'Complete Advanced Leadership Course', impact: 'Professional Development'},
      {user_id: 1, objective: 'Achieve 90% on Physical Fitness Test', impact: 'Health and Fitness'},
      {user_id: 1, objective: 'Maintain a Healthy Work-Life Balance', impact: 'Well-being'},
      {user_id: 2, objective: 'Earn a Professional Certification', impact: 'Career Advancement'},
      {user_id: 2, objective: 'Improve Time Management Skills', impact: 'Productivity'},
      {user_id: 2, objective: 'Enhance Communication Skills', impact: 'Professional Growth'},
      {user_id: 3, objective: 'Complete Bachelor\'s Degree Program', impact: 'Educational Achievement'},
      {user_id: 3, objective: 'Participate in Regular Physical Exercise', impact: 'Health and Wellness'},
      {user_id: 3, objective: 'Explore a New Hobby or Interest', impact: 'Personal Growth'},
  ]);
};