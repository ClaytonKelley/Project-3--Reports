/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('accounts_data', table => {
      table.foreign('unit_id').references('units_data.id').deferrable('deferred')
      table.foreign('user_group_id').references('user_groups.id').deferrable('deferred')
    })
  };

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.alterTable('accounts_data', table =>{
          table.dropForeign('unit_id');
          table.dropForeign('user_group_id');
      })
  };
