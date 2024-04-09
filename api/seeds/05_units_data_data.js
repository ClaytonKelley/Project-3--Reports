/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units_data').del()
  await knex('units_data').insert([
    {id: 1, name: '', location: ''},
    {id: 2, name: '', location: ''},
    {id: 3, name: '', location: ''}
  ]);
};
