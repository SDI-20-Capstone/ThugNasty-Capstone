/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('objectives').del()
  await knex('objectives').insert([
    {user_id: 1, organization_id: 1, title: 'Enhance Air Force Readiness', mission_impact: 'Strategic Operational Excellence'},
    {user_id: 2, organization_id: 1, title: 'Optimize Logistics Operations', mission_impact: 'Tactical Mission Success'},
    {user_id: 2, organization_id: 2, title: 'Enhance Orbital Operations', mission_impact: 'Space Domain Superiority'},
    {user_id: 1, organization_id: 2, title: 'Improve Satellite Communication', mission_impact: 'Global Information Dominance'},
    {user_id: 1, organization_id: 3, title: 'Optimize Mission Support Processes', mission_impact: 'Mission Operational Efficiency'},
    {user_id: 2, organization_id: 3, title: 'Enhance Logistics Management', mission_impact: 'Resource Optimization and Support Readiness'},
    {user_id: 1, organization_id: 4, title: 'Enhance Medical Readiness', mission_impact: 'Force Health Protection and Readiness'},
    {user_id: 2, organization_id: 4, title: 'Improve Patient Care Services', mission_impact: 'Medical Operational Excellence'},
    {user_id: 1, organization_id: 5, title: 'Enhance Financial Accountability', mission_impact: 'Mission Resource Stewardship'},
    {user_id: 2, organization_id: 5, title: 'Optimize Budget Allocation Processes', mission_impact: 'Financial Efficiency and Resource Optimization'},
    {user_id: 1, organization_id: 6, title: 'Enhance Rapid Deployment Capabilities', mission_impact: 'Global Expeditionary Mobility'},
    {user_id: 2, organization_id: 6, title: 'Improve Aircraft Maintenance Turnaround Time', mission_impact: 'Operational Efficiency and Mission Readiness'},
    {user_id: 1, organization_id: 7, title: 'Enhance Satellite Launch Capabilities', mission_impact: 'Pioneering Space Exploration'},
    {user_id: 2, organization_id: 7, title: 'Improve Launch Vehicle Reliability', mission_impact: 'Ensuring Mission Success in Space'},
    {user_id: 1, organization_id: 8, title: 'Enhance Intelligence, Surveillance, and Reconnaissance (ISR) Operations', mission_impact: 'National Security'},
    {user_id: 2, organization_id: 8, title: 'Improve Data Fusion and Analysis Capabilities', mission_impact: 'Operational Effectiveness'},
    {user_id: 1, organization_id: 9, title: 'Fortify Cybersecurity Bastions', mission_impact: 'National Cyber Defense Dominance'},
    {user_id: 2, organization_id: 9, title: 'Deploy Sentinel Protocols for Threat Suppression', mission_impact: 'Operational Resilience and Cyber Threat Supremacy'},
    {user_id: 1, organization_id: 10, title: 'Optimize Combat Engineering Processes', mission_impact: 'Strategic Infrastructure Enhancement'},
    {user_id: 2, organization_id: 10, title: 'Enhance Energy Efficiency in Tactical Facilities', mission_impact: 'Operational Environmental Stewardship'},
    {user_id: 1, organization_id: 11, title: 'Optimize Contracting Operations', mission_impact: 'Strategic Logistics Streamlining'},
    {user_id: 2, organization_id: 11, title: 'Forge Strong Vendor Alliances', mission_impact: 'Integrated Supplier Collaboration'},
    {user_id: 1, organization_id: 12, title: 'Optimize Personnel Support Services', mission_impact: 'Enhancing Force Morale and Resilience'},
    {user_id: 2, organization_id: 12, title: 'Elevate Customer Satisfaction in Support Operations', mission_impact: 'Operational Service Excellence'},
    {user_id: 1, organization_id: 13, title: 'Optimize Combat Logistics Operations', mission_impact: 'Strategic Resource Dominance'},
    {user_id: 2, organization_id: 13, title: 'Fortify Supply Chain Resilience', mission_impact: 'Logistical Stability and Tactical Support'},
    {user_id: 1, organization_id: 14, title: 'Fortify Base Security Measures', mission_impact: 'Mission Safety and Protective Readiness'},
    {user_id: 2, organization_id: 14, title: 'Elevate Emergency Response Excellence', mission_impact: 'Swift Crisis Management and Operational Resilience'},
    {user_id: 1, organization_id: 15, title: 'Optimize Healthcare Services for Operational Readiness', mission_impact: 'Force Health and Operational Well-being'},
    {user_id: 2, organization_id: 15, title: 'Institute Tactical Preventive Health Programs', mission_impact: 'Promoting Health Resilience and Combat Readiness'},
    {user_id: 1, organization_id: 16, title: 'Enhance Operational Maintenance Processes', mission_impact: 'Operational Excellence and Force Sustainability'},
    {user_id: 2, organization_id: 16, title: 'Elevate Equipment Reliability for Mission Success', mission_impact: 'Mission Readiness and Strategic Effectiveness'},
  ]);
};
