/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('organization').del()
    await knex('organization').insert([
      {name: 'SLD 30', parent_id: null},
      {name: '30 OG', parent_id: 1},
      {name: '30 MSG', parent_id: 1},
      {name: '30 MDG', parent_id: 1},
      {name: '30 CPTS', parent_id: 1},
      {name: '2 ROPS', parent_id: 2},
      {name: '2 SLS', parent_id: 2},
      {name: '30 OSS', parent_id: 2},
      {name: '30 SCS', parent_id: 2},
      {name: '30 CES', parent_id: 3},
      {name: '30 CONS', parent_id: 3},
      {name: '30 FSS', parent_id: 3},
      {name: '30 LRS', parent_id: 3},
      {name: '30 SFS', parent_id: 3},
      {name: '30 HCOS', parent_id: 4},
      {name: '30 OMRS', parent_id: 4},
    ]);
  };

