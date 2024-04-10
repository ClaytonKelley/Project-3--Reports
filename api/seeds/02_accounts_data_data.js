/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('report_data').del()
  await knex('satellite_data').del()
  await knex('accounts_data').del()
  await knex('units_data').del()
  await knex('user_groups').del()

  await knex.raw('TRUNCATE TABLE user_groups RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE units_data RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE accounts_data RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE satellite_data RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE report_data RESTART IDENTITY CASCADE')

  await knex('user_groups').insert([
    {isAdmin: true, Title: 'Admin'},
    {isAdmin: false, Title: 'User'}
  ]);
  await knex('units_data').insert([
    {name: '53 SOPS', location: 'Schriever'},
    {name: '4 EWS', location: 'Peterson'},
    {name: '2 SOPS', location: 'Schriever'}
  ]);
  await knex('accounts_data').insert([
    {o_auth_id:70948245,username:'wghfw',rank:'O9',phone:4739203,email:'thewrf@spaceforce.mil',CHOPs:'PDE',unit_id:1,user_group_id:2},
    {o_auth_id:213451234,username:'adfaq',rank:'E5',phone:34111234,email:'qwekrj@spaceforce.mil',CHOPs:'SKE',unit_id:1,user_group_id:1},
    {o_auth_id:130987432,username:'ader',rank:'E4',phone:7893134,email:'qqqerd@spaceforce.mil',CHOPs:'WIF',unit_id:2,user_group_id:2},
    {o_auth_id:2498703,username:'hw4h',rank:'O2',phone: 4981342,email:'qerdfq@spaceforce.mil',CHOPs:'POD',unit_id:3,user_group_id:1}
  ]);

  await knex('satellite_data').insert([
    {satellite_name:'qrgeuw',iron:8764,orbital_pos:'45 E',norad_id:2453},
    {satellite_name:'afsdq',iron:2453,orbital_pos:'34 W',norad_id:4768},
    {satellite_name:'qerfq',iron:3563,orbital_pos:'34 E',norad_id:2534},
    {satellite_name:'qgdgas',iron:6754,orbital_pos:'65 W',norad_id:1234},
    {satellite_name:'qersfg',iron:8657,orbital_pos:'41 W',norad_id:5462},
    {satellite_name:'ytwrsh',iron:3564,orbital_pos:'2 E',norad_id:5673},
    {satellite_name:'qtjdtyj',iron:2453,orbital_pos:'34 W',norad_id:8465},
    {satellite_name:'sgh6uw',iron:2456,orbital_pos:'12 W',norad_id:4374},
    {satellite_name:'shwyw',iron:2434,orbital_pos:'35 E',norad_id:4567},
    {satellite_name:'qrtgqr',iron:7578,orbital_pos:'32 E',norad_id:2456}

  ]);

  await knex('report_data').insert([
    /*WGS 24 Hour Report*/ {
      report_name: "WGS 24 Hour Report",  // date: Autopopulated,
      unit: '53 SOPS',
      team_name: 'da boyz',
      mission_number: '2487ax3',
      satellite_id: 3,
      tpo: 1231123.87234,
      'eb-no': 0.5,
      ber: 0.0012,
      latitude: '10.1 N',
      longitude: '10.1 E',
      pim: '1320 lat: 11.1 W long: 12.1 E',
      weather: 'sunny day',
      event: null,
      terminal: 'antxc156b',
      opscap: null,
      syscap: null,
      hazcon: 'shit everywhere',
      comments: 'please clean up this shit',
      user_id: 1,
    },
    /*CCS Report*/ {
      report_name: "CCS log",  // date: Autopopulated,
      unit: '4 EWS',
      team_name: 'da better boyz',
      mission_number: '32967',
      satellite_id: 5,
      tpo: null,
      'eb-no': 0.5,
      ber: 0.0012,
      latitude: '58.9 N' ,
      longitude: '76.4 W',
      pim: null,
      weather: 'cloudy with a chance of meatballs',
      event: 'we did real nice',
      opscap: 'GREEN',
      syscap: 'GREEN',
      hazcon: 'shit everywhere here too',
      comments: 'please clean up everyones shit',
      user_id: 3
    },
    /*GPS Report*/ {

      report_name: "GPS log",  // date: Autopopulated,
      unit: '2 SOPS',
      team_name: 'da sad boyz',
      mission_number: '420',
      satellite_id: 6,
      tpo: null,
      'eb-no': null,
      ber: 0.0012,
      latitude: '87.3 N' ,
      longitude: '.021 E',
      pim: null,
      weather: 'rainy day',
      event: null,
      terminal: null,
      opscap: null,
      syscap: null,
      hazcon: 'shit...',
      comments: 'why cant anyone get their shit cleaned up?',
      user_id: 2,
    },
    /*WGS 24 Hour Report*/ {

      report_name: "WGS 24 Hour Report",  // date: Autopopulated,
      unit: '53 SOPS',
      team_name: 'da boyz',
      mission_number: '9283408',
      satellite_id: 2,
      tpo: 987435.3094123,
      'eb-no': 0.4,
      ber: 0.0104,
      latitude: '64.2 N',
      longitude: '13.3 E',
      pim: '1320 lat: 11.1 W long: 12.1 E',
      weather: 'suns out guns out',
      event: null,
      terminal: '928731ux',
      opscap: null,
      syscap: null,
      hazcon: 'We caught the shit',
      comments: 'send help',
      user_id: 1,
    },
    /*CCS Report*/ {

      report_name: "CCS log",  // date: Autopopulated,
      unit: '4 EWS',
      team_name: 'da better boyz',
      mission_number: '32967',
      satellite_id: 5,
      tpo: null,
      'eb-no': 0.5,
      ber: 0.0012,
      latitude: '58.9 N' ,
      longitude: '76.4 W',
      pim: null,
      weather: 'cloudy with a chance of meatballs',
      event: 'we did real nice',
      opscap: 'GREEN',
      syscap: 'GREEN',
      hazcon: 'shit everywhere here too',
      comments: 'please clean up everyones shit',
      user_id: 3
    },
    /*GPS Report*/ {
      report_name: "GPS log",  // date: Autopopulated,
      unit: '2 SOPS',
      team_name: 'da sad boyz',
      mission_number: '420-1',
      satellite_id: 7,
      tpo: null,
      'eb-no': null,
      ber: 1,
      latitude: '69.3 N' ,
      longitude: '69.3 E',
      pim: null,
      weather: 'gonna be a bright sunny day',
      event: null,
      terminal: null,
      opscap: null,
      syscap: null,
      hazcon: 'good shit',
      comments: 'finnaly something good',
      user_id: 2,
    }
  ]);

};