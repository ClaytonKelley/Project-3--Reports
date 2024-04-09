/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('satellite_data').del()
  await knex('satellite_data').insert([
    {id:0, satellite_name:'qrgeuw',iron:8764,orbital_pos:'45 E',norad_id:2453},
    {id:1, satellite_name:'afsdq',iron:2453,orbital_pos:'34 W',norad_id:4768},
    {id:2, satellite_name:'qerfq',iron:3563,orbital_pos:'34 E',norad_id:2534},
    {id:3, satellite_name:'qgdgas',iron:6754,orbital_pos:'65 W',norad_id:1234},
    {id:4, satellite_name:'qersfg',iron:8657,orbital_pos:'41 W',norad_id:5462},
    {id:5, satellite_name:'ytwrsh',iron:3564,orbital_pos:'2 E',norad_id:5673},
    {id:6, satellite_name:'qtjdtyj',iron:2453,orbital_pos:'34 W',norad_id:8465},
    {id:7, satellite_name:'sgh6uw',iron:2456,orbital_pos:'12 W',norad_id:4374},
    {id:8, satellite_name:'shwyw',iron:2434,orbital_pos:'35 E',norad_id:4567},
    {id:9, satellite_name:'qrtgqr',iron:7578,orbital_pos:'32 E',norad_id:2456}

  ]);
};
