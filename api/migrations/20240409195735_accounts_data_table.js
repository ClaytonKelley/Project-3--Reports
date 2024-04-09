/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('accounts_data', (table) => {
        table.increments('id'),
        table.varchar('o_auth_id', 50).notNullable(),
        table.integer('username', 40).notNullable(),
        table.string('rank', 20).notNullable(),
        table.integer('phone',20).notNullable(),
        table.string('email',40).notNullable(),
        table.integer('CHOPs',3).notNullable(),
        table.integer('unit_id',20).notNullable(),
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
