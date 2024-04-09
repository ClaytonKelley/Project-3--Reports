/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('accounts_data', (table) => {
        table.increments('id'),
        table.varchar('o_auth_id', 50).notNullable(),
        table.string('username', 40).notNullable(),
        table.string('rank', 20).notNullable(),
        table.integer('phone',20).notNullable(),
        table.string('email',40).notNullable(),
        table.string('CHOPs',3).notNullable(),
        table.integer('unit_id',20).notNullable(),
        // table.foreign('unit_id').references('units_data.id'),
        table.integer('user_group_id',20).notNullable()
        // table.foreign('user_group_id').references('user_groups.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('accounts_data')
};
