/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('accounts_data').del()
  await knex('accounts_data').insert([
    {id:1,o_auth_id:213451234,username:'adfaq',rank:'E5',phone:34111234,email:'qwekrj@spaceforce.mil',CHOPs:'SKE',unit_id:1,user_group_id:1},
    {id:2,o_auth_id:130987432,username:'ader',rank:'E4',phone:7893134,email:'qqqerd@spaceforce.mil',CHOPs:'WIF',unit_id:2,user_group_id:2},
    {id:3,o_auth_id:2498703,username:'hw4h',rank:'O2',phone: 4981342,email:'qerdfq@spaceforce.mil',CHOPs:'POD',unit_id:3,user_group_id:1},
    {id:4,o_auth_id:70948245,username:'wghfw',rank:'O9',phone:4739203,email:'thewrf@spaceforce.mil',CHOPs:'PDE',unit_id:1,user_group_id:2}
  ]);
};
