/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units_data').del()
  await knex('units_data').insert([
    {id: 1, name: '53 SOPS', location: 'Schriever'},
    {id: 2, name: '4 EWS', location: 'Peterson'},
    {id: 3, name: '2 SOPS', location: 'Schriever'}
  ]);
};
