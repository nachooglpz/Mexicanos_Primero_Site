/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Notificaciones_a_aliados', function(t) {
        t.integer('ID_notificacion').unsigned().notNull();
        t.string('Usuario_aliado').notNull();

        // Foreign key de ID_convenio
        t.foreign('ID_notificacion')
            .references('ID_notificacion')
            .inTable('Notificaciones')
            .onDelete('CASCADE');

        t.foreign('Usuario_aliado')
            .references('Usuario_aliado')
            .inTable('Aliados')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Notificaciones_a_aliados');
};
