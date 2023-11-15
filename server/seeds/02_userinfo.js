/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('userinfo').del()
  await knex('userinfo').insert([
    {first_name: 'Drina', last_name: 'Baptiste', email:'drina.baptiste@spaceforce.mil', organization_id: 1, password:'123', rank:'SrA'},
    {first_name: 'Joe', last_name: 'Biden', email:'momma@gmail.com', organization_id: 2, password:'1234', rank:'president'},
  ]);
};

