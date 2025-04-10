/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Notificaciones_a_administradores_de_escuelas', function(t) {
        t.integer('ID_notificacion').unsigned().notNull();
        t.string('Usuario_escuela').notNull();

        // Foreign key de ID_notificacion
        t.foreign('ID_notificacion')
            .references('ID_notificacion')
            .inTable('Notificaciones')
            .onDelete('CASCADE');

        // Foreign key de Usuario_escuela
        t.foreign('Usuario_escuela')
            .references('Usuario_escuela')
            .inTable('Administradores_de_Escuela')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Notificaciones_a_administradores_de_escuelas');
};
