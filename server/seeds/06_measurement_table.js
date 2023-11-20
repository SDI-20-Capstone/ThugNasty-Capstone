/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('measurement_table').del()
    await knex('measurement_table').insert([
      {key_result_id: 1, date: 20231201, count: 88, success: true, notes: 'Significantly improved aircraft availability'},
      {key_result_id: 2, date: 20231210, count: 60, success: true, notes: 'Optimized supply chain processes for enhanced operational efficiency'},
      {key_result_id: 3, date: 20231128, count: 96, success: true, notes: 'Achieved enhanced satellite uptime'},
      {key_result_id: 4, date: 20231208, count: 82, success: true, notes: 'Successfully implemented advanced communication protocols'},
      {key_result_id: 5, date: 20231130, count: 48, success: true, notes: 'Successfully reduced processing time for supply requests'},
      {key_result_id: 6, date: 20231210, count: 82, success: true, notes: 'Implemented automated inventory tracking for improved mission support'},
      {key_result_id: 7, date: 20231210, count: 98, success: true, notes: 'Exceeded training hours target for medical personnel, contributing to enhanced force health'},
      {key_result_id: 8, date: 20231225, count: 82, success: true, notes: 'Successfully implemented telehealth services for improved medical operational capabilities'},
      {key_result_id: 9, date: 20231210, count: 13, success: true, notes: 'Successfully achieved a 13% reduction in budget variance'},
      {key_result_id: 10, date: 20231225, count: 92, success: true, notes: 'Implemented automated expense tracking to enhance financial efficiency and resource stewardship'},
      {key_result_id: 11, date: 20231210, count: 22, success: true, notes: 'Exceeded target with 22% faster deployment readiness for global expeditionary missions'},
      {key_result_id: 12, date: 20231225, count: 28, success: true, notes: 'Achieved a 28% reduction in aircraft maintenance time, enhancing operational efficiency and mission readiness'},
      {key_result_id: 13, date: 20231210, count: 16, success: true, notes: 'Successfully exceeded the target with a 16% increased payload capacity, advancing space exploration capabilities'},
      {key_result_id: 14, date: 20231225, count: 92, success: true, notes: 'Achieved a 92% launch success rate, ensuring mission success in the space domain'},
      {key_result_id: 15, date: 20240115, count: 22, success: true, notes: 'Exceeded target with 22% increased ISR data accuracy'},
      {key_result_id: 16, date: 20240125, count: 25, success: true, notes: 'Achieved 25% reduction in data processing time'},
      {key_result_id: 17, date: 20240215, count: 98, success: true, notes: 'Successfully fortified cybersecurity bastions with a 98% success rate'},
      {key_result_id: 18, date: 20240225, count: 10, success: true, notes: 'Executed sentinel protocols, conducting penetration testing on all critical systems with precision'},
      {key_result_id: 19, date: 20240220, count: 88, success: true, notes: 'Successfully implemented agile construction practices for strategic infrastructure enhancement'},
      {key_result_id: 20, date: 20240228, count: 18, success: true, notes: 'Achieved a 20% reduction in energy consumption, contributing to operational environmental stewardship'},
      {key_result_id: 21, date: 20240220, count: 18, success: true, notes: 'Successfully accelerated contract processing time for strategic logistics streamlining'},
      {key_result_id: 22, date: 20240228, count: 5, success: true, notes: 'Executed vendor partnership programs to enhance integrated supplier collaboration'},
      {key_result_id: 23, date: 20240315, count: 12, success: true, notes: 'Successfully accelerated customer support response time, enhancing force morale and resilience'},
      {key_result_id: 23, date: 20240331, count: 3, success: false, notes: 'Encountered some challenges in reducing response time, addressing for continuous improvement'},
      {key_result_id: 24, date: 20240320, count: 80, success: true, notes: 'Established an advanced training program for support staff, contributing to operational service excellence'},
      {key_result_id: 25, date: 20240315, count: 1, success: true, notes: 'Successfully deployed an advanced inventory management system for strategic resource dominance'},
      {key_result_id: 26, date: 20240320, count: 80, success: true, notes: 'Achieved outstanding on-time delivery rates, ensuring logistical stability and tactical support'},
      {key_result_id: 26, date: 20240331, count: 5, success: false, notes: 'Encountered some challenges in meeting on-time delivery targets, addressing for continuous improvement'},
      {key_result_id: 27, date: 20240315, count: 1, success: true, notes: 'Successfully deployed state-of-the-art surveillance systems for mission safety and protective readiness'},
      {key_result_id: 28, date: 20240310, count: 2, success: true, notes: 'Conducted a successful quarterly emergency response drill, enhancing swift crisis management and operational resilience'},
      {key_result_id: 28, date: 20240320, count: 1, success: false, notes: 'Identified minor issues during the emergency response drill, addressing for continuous improvement'},
      {key_result_id: 29, date: 20240315, count: 1, success: true, notes: 'Successfully deployed state-of-the-art medical equipment for force health and operational well-being'},
      {key_result_id: 30, date: 20240310, count: 2, success: true, notes: 'Executed a successful quarterly health education campaign, promoting health resilience and combat readiness'},
      {key_result_id: 30, date: 20240320, count: 1, success: false, notes: 'Identified minor issues during the campaign, addressing for continuous improvement'},
      {key_result_id: 31, date: 20240310, count: 1, success: true, notes: 'Successfully deployed a cutting-edge predictive maintenance system for operational excellence and force sustainability'},
      {key_result_id: 32, date: 20240315, count: 18, success: true, notes: 'Exceeded target with 95% equipment uptime, ensuring mission readiness and strategic effectiveness'},
      {key_result_id: 32, date: 20240320, count: 2, success: false, notes: 'Identified minor equipment issues causing brief downtime, addressing for continuous improvement'},
    ]);
  };