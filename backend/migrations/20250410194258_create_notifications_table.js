/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('notificaciones', function(t) {
        t.increments('id_notificacion').primary();
        t.text('titulo').notNull();
        t.text('texto').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('notificaciones');
};
