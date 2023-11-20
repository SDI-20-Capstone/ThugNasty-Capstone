/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('key_results').del()
  await knex('key_results').insert([
    {title: 'Increase Aircraft Availability', objective_id: 1, start_date: '2023-11-25', end_date: '2023-12-05', target_value: 95, success_count: 90, fail_count: 3},
    {title: 'Streamline Supply Chain Processes', objective_id: 2, start_date: '2023-12-06', end_date: '2023-12-15', target_value: 80, success_count: 75, fail_count: 5},
    {title: 'Increase Satellite Uptime', objective_id: 3, start_date: '2023-11-22', end_date: '2023-12-02', target_value: 98, success_count: 95, fail_count: 2},
    {title: 'Implement Advanced Communication Protocols', objective_id: 4, start_date: '2023-12-03', end_date: '2023-12-12', target_value: 85, success_count: 80, fail_count: 4},
    {title: 'Reduce Processing Time for Supply Requests', objective_id: 5, start_date: '2023-11-25', end_date: '2023-12-05', target_value: 50, success_count: 45, fail_count: 2},
    {title: 'Implement Automated Inventory Tracking', objective_id: 6, start_date: '2023-12-06', end_date: '2023-12-15', target_value: 80, success_count: 75, fail_count: 3},
    {title: 'Increase Training Hours for Medical Personnel', objective_id: 7, start_date: '2023-12-01', end_date: '2023-12-15', target_value: 100, success_count: 95, fail_count: 2},
    {title: 'Implement Telehealth Services', objective_id: 8, start_date: '2023-12-16', end_date: '2023-12-31', target_value: 80, success_count: 78, fail_count: 5},
    {title: 'Reduce Budget Variance by 15%', objective_id: 9, start_date: '2023-12-01', end_date: '2023-12-15', target_value: 15, success_count: 14, fail_count: 1},
    {title: 'Implement Automated Expense Tracking', objective_id: 10, start_date: '2023-12-16', end_date: '2023-12-31', target_value: 90, success_count: 87, fail_count: 3},
    {title: 'Achieve 20% Faster Deployment Readiness', objective_id: 11, start_date: '2023-12-01', end_date: '2023-12-15', target_value: 20, success_count: 18, fail_count: 2},
    {title: 'Reduce Aircraft Maintenance Time by 30%', objective_id: 12, start_date: '2023-12-01', end_date: '2023-12-31', target_value: 30, success_count: 25, fail_count: 5},
    {title: 'Increase Payload Capacity by 15%', objective_id: 13, start_date: '2023-12-01', end_date: '2023-12-15', target_value: 15, success_count: 14, fail_count: 1},
    {title: 'Achieve 95% Launch Success Rate', objective_id: 14, start_date: '2023-12-01', end_date: '2023-12-31', target_value: 95, success_count: 90, fail_count: 5},
    {title: 'Increase ISR Data Accuracy by 20%', objective_id: 15, start_date: '2024-01-05', end_date: '2024-01-20', target_value: 20, success_count: 18, fail_count: 2},
    {title: 'Reduce Data Processing Time by 30%', objective_id: 16, start_date: '2024-01-05', end_date: '2024-01-31', target_value: 30, success_count: 28, fail_count: 2},
    {title: 'Upgrade Firewall Systems to the Latest Version', objective_id: 17, start_date: '2024-02-05', end_date: '2024-02-20', target_value: 100, success_count: 95, fail_count: 5},
    {title: 'Conduct Penetration Testing on Critical Systems', objective_id: 18, start_date: '2024-02-05', end_date: '2024-02-29', target_value: 10, success_count: 10, fail_count: 0},
    {title: 'Implement Agile Construction Practices', objective_id: 19, start_date: '2024-02-01', end_date: '2024-02-29', target_value: 90, success_count: 80, fail_count: 10},
    {title: 'Achieve 20% Reduction in Energy Consumption', objective_id: 20, start_date: '2024-02-01', end_date: '2024-02-29', target_value: 20, success_count: 20, fail_count: 0},
    {title: 'Accelerate Contract Processing Time by 20%', objective_id: 21, start_date: '2024-02-01', end_date: '2024-02-29', target_value: 20, success_count: 18, fail_count: 2},
    {title: 'Deploy Vendor Partnership Programs', objective_id: 22, start_date: '2024-02-01', end_date: '2024-02-29', target_value: 5, success_count: 5, fail_count: 0},
    {title: 'Accelerate Customer Support Response Time', objective_id: 23, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 15, success_count: 12, fail_count: 3},
    {title: 'Establish Advanced Training Program for Support Staff', objective_id: 24, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 100, success_count: 80, fail_count: 5},
    {title: 'Deploy Advanced Inventory Management System', objective_id: 25, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 1, success_count: 1, fail_count: 0},
    {title: 'Achieve 95% On-time Delivery Rates', objective_id: 26, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 95, success_count: 80, fail_count: 5},
    {title: 'Deploy State-of-the-Art Surveillance Systems', objective_id: 27, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 1, success_count: 1, fail_count: 0},
    {title: 'Conduct Quarterly Emergency Response Drills', objective_id: 28, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 4, success_count: 3, fail_count: 1},
    {title: 'Deploy State-of-the-Art Medical Equipment', objective_id: 29, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 1, success_count: 1, fail_count: 0},
    {title: 'Execute Quarterly Health Education Campaigns', objective_id: 30, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 3, success_count: 2, fail_count: 1},
    {title: 'Deploy Cutting-Edge Predictive Maintenance System', objective_id: 31, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 1, success_count: 1, fail_count: 0},
    {title: 'Achieve 95% Equipment Uptime', objective_id: 32, start_date: '2024-03-01', end_date: '2024-03-31', target_value: 95, success_count: 15, fail_count: 2},
  ]);
};
