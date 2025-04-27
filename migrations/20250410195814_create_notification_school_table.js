/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('notificaciones_a_administradores_de_escuelas', function(t) {
        t.integer('id_notificacion').unsigned().notNull();
        t.string('usuario_escuela').notNull();

        // Foreign key de ID_notificacion
        t.foreign('id_notificacion')
            .references('id_notificacion')
            .inTable('notificaciones')
            .onDelete('CASCADE');

        // Foreign key de Usuario_escuela
        t.foreign('usuario_escuela')
            .references('usuario_escuela')
            .inTable('administradores_de_escuela')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('notificaciones_a_administradores_de_escuelas');
};
