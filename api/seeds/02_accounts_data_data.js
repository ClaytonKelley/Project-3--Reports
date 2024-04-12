/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 */
const reportsData = require('./JSON_Data/Reports.json');
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("report_data").del();
  await knex("satellite_data").del();
  await knex("accounts_data").del();
  await knex("units_data").del();
  await knex("user_groups").del();

  await knex.raw("TRUNCATE TABLE user_groups RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE units_data RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE accounts_data RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE satellite_data RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE report_data RESTART IDENTITY CASCADE");

  await knex("user_groups").insert([
    { isAdmin: true, Title: "Admin" },
    { isAdmin: false, Title: "User" },
  ]);
  await knex("units_data").insert([
    { name: "53 SOPS", location: "Schriever" },
    { name: "4 EWS", location: "Peterson" },
    { name: "2 SOPS", location: "Schriever" },
  ]);
  await knex("accounts_data").insert([
    {
      oauth_sub: "0912384712390487",
      username: "wghfw",
      rank: "O9",
      phone: 4739203,
      email: "thewrf@spaceforce.mil",
      chops: "PDE",
      unit_id: 1,
      user_group_id: 2,
    },
    {
      oauth_sub: "109541936",
      username: "adfaq",
      rank: "E5",
      phone: 34111234,
      email: "qwekrj@spaceforce.mil",
      chops: "SKE",
      unit_id: 1,
      user_group_id: 1,
    },
    {
      oauth_sub: 130987432,
      username: "ader",
      rank: "E4",
      phone: 7893134,
      email: "qqqerd@spaceforce.mil",
      chops: "WIF",
      unit_id: 2,
      user_group_id: 2,
    },
    {
      oauth_sub: 2498703,
      username: "hw4h",
      rank: "O2",
      phone: 4981342,
      email: "qerdfq@spaceforce.mil",
      chops: "POD",
      unit_id: 3,
      user_group_id: 1,
    },
  ]);

  await knex("satellite_data").insert([
    {
      satellite_name: "WGS 1",
      iron: 8764,
      orbital_pos: "45 E",
      norad_id: 2453,
    },
    {
      satellite_name: "WGS 2",
      iron: 2453,
      orbital_pos: "34 W",
      norad_id: 4768,
    },
    {
      satellite_name: "WGS 3",
      iron: 3563,
      orbital_pos: "34 E",
      norad_id: 2534,
    },
    {
      satellite_name: "WGS 4",
      iron: 6754,
      orbital_pos: "65 W",
      norad_id: 1234,
    },
    {
      satellite_name: "WGS 5",
      iron: 8657,
      orbital_pos: "41 W",
      norad_id: 5462,
    },
    { satellite_name: "WGS 6", iron: 3564, orbital_pos: "2 E", norad_id: 5673 },
    {
      satellite_name: "WGS 7",
      iron: 2453,
      orbital_pos: "34 W",
      norad_id: 8465,
    },
    {
      satellite_name: "WGS 8",
      iron: 2456,
      orbital_pos: "12 W",
      norad_id: 4374,
    },
    {
      satellite_name: "WGS 9",
      iron: 2434,
      orbital_pos: "35 E",
      norad_id: 4567,
    },
    {
      satellite_name: "WGS 10",
      iron: 7578,
      orbital_pos: "32 E",
      norad_id: 2456,
    },
  ]);

  await knex("report_data").insert(reportsData);
};
