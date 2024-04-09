/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('report_template', (table) => {
    table.increments('id').primary();
    table.string('report_name', 100).notNullable();
    table.boolean('date',5).notNullable();
    table.boolean('unit').notNullable();
    table.boolean('team_name').notNullable();
    table.boolean('mission_number').notNullable();
    table.boolean('satellite_name').notNullable();
    table.boolean('norad_id').notNullable();
    table.boolean('tpo').notNullable();
    table.boolean('eb-no').notNullable();
    table.boolean('ber').notNullable();
    table.boolean('location').notNullable();
    table.boolean('pim').notNullable();
    table.boolean('weather').notNullable();
    table.boolean('event').notNullable();
    table.boolean('terminal').notNullable();
    table.boolean('opscap').notNullable();
    table.boolean('syscap').notNullable();
    table.boolean('hazcon').notNullable();
    table.boolean('comments').notNullable();
    table.boolean('username').notNullable();
    table.boolean('phone').notNullable();
    table.boolean('email').notNullable();
    table.boolean('chops').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('report_template')
};
