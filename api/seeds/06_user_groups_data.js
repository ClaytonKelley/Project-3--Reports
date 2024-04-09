/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_groups').del()
  await knex('user_groups').insert([
    {id: 1, isAdmin: 'Yes', Title: 'Owner'},
    {id: 2, isAdmin: 'Yes', Title: 'Senior System Analysis'},
    {id: 3, isAdmin: 'No', Title: 'Snuffy'}
  ]);
};
