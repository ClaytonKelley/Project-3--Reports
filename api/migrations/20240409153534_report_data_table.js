/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('report_data', (table) => {
        table.increments('id').primary();
        table.string('report_name', 100);
        table.timestamp('date').defaultTo(knex.fn.now());
        table.string('unit',20);
        table.string('team_name',40);
        table.string('mission_number',20);
        table.integer('satellite_id',5);
        // table.foreign('satellite_id').references('satellite_data.id');
        table.string('tpo',20);
        table.string('eb-no',10);
        table.string('ber',15);
        table.string('latitude',20);
        table.string('longitude',20);
        table.string('pim');
        table.string('weather',50);
        table.string('event', 255);
        table.string('terminal',50);
        table.string('opscap',10);
        table.string('syscap',10);
        table.string('hazcon',100);
        table.string('comments',255);
        table.integer('user_id',8);
        // table.foreign('user_id').references('accounts_data.id')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('report_data')
};
