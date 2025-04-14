/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('notificaciones_a_administradores', function(t) {
        t.integer('id_notificacion').unsigned().notNull();
        t.string('usuario_admin').notNull();

        // Foreign key de ID_notificacion
        t.foreign('id_notificacion')
            .references('id_notificacion')
            .inTable('notificaciones')
            .onDelete('CASCADE');

        // Foreign key de Usuario_escuela
        t.foreign('usuario_admin')
            .references('usuario_admin')
            .inTable('administrador')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('notificaciones_a_administradores');
};
