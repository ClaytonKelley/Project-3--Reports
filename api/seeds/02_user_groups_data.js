/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_groups').del()
  await knex('user_groups').insert([
    {id: 1, isAdmin: true, Title: 'Admin'},
    {id: 2, isAdmin: false, Title: 'User'}
  ]);
};
