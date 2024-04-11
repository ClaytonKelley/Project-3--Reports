/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('accounts_data', (table) => {
        table.increments('id'),
        table.string('oauth_sub', 50).notNullable(),
        table.string('username', 40).notNullable(),
        table.string('rank', 20)
        table.integer('phone',20)
        table.string('email',40).notNullable(),
        table.string('chops',3)
        table.integer('unit_id',20)
        table.integer('user_group_id',20).notNullable()

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('accounts_data')
};
