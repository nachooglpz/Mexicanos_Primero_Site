/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('notificaciones_a_aliados', function(t) {
        t.integer('id_notificacion').unsigned().notNull();
        t.string('usuario_aliado').notNull();

        // Foreign key de ID_convenio
        t.foreign('id_notificacion')
            .references('id_notificacion')
            .inTable('notificaciones')
            .onDelete('CASCADE');

        t.foreign('usuario_aliado')
            .references('usuario_aliado')
            .inTable('aliados')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('notificaciones_a_aliados');
};
