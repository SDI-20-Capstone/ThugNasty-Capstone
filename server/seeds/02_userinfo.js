/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('userinfo').del()
  await knex('userinfo').insert([
    {first_name: 'Drina', last_name: 'Baptiste', email:'drina.baptiste@spaceforce.mil', organization_id: 1, password:'123', rank:'SrA', role: 'admin'},
    {first_name: 'Joe', last_name: 'Smith', email:'joe@gmail.com', organization_id: 2, password:'1234', rank:'MSgt', role: 'org_owner'},
    {first_name: 'Rachel', last_name: 'Turner', email:'turner@gmail.com', organization_id: 3, password:'9876', rank:'Capt', role: 'user'},
  ]);
};

