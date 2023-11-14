/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('userinfo').del()
  await knex('userinfo').insert([
    {first_name: 'Drina', last_name: 'Baptiste', email:'drina.baptiste@spaceforce.mil', password:'123', organization:'45th CPTS', rank:'SrA', role:'Admin'},
    {first_name: 'Joe', last_name: 'Biden', email:'momma@gmail.com', password:'1234', organization:'murica', rank:'president', role:'Admin'},
  ]);
};

