/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('satellite_data', (table) => {
        table.increments('id'),
        table.string('satellite_name', 50).notNullable,
        table.integer('iron', 6).notNullable,
        table.string('orbital_pos', 50).notNullable,
        table.integer('norad_id',20).notNullable
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('satellite_data')
};
