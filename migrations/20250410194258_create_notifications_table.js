/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Notificaciones', function(t) {
        t.increments('ID_notificacion').primary();
        t.text('Titulo').notNull();
        t.text('Texto').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Notificaciones');
};
