/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('report_data', table => {

    table.foreign('satellite_id').references('satellite_data.id').deferrable('deferred')
    table.foreign('user_id').references('accounts_data.id').deferrable('deferred')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
     return knex.schema.alterTable('report_data', table =>{
         table.dropForeign('satellite_id');
         table.dropForeign('user_id');
     })
};
