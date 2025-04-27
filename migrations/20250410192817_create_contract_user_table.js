/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('usuarios_por_convenio', function(t) {
        t.integer('id_convenio').unsigned().notNull();
        t.string('usuario_aliado').notNull();
        t.string('usuario_escuela').notNull();

        // Foreign key de ID_convenio
        t.foreign('id_convenio')
            .references('id_convenio')
            .inTable('convenio')
            .onDelete('CASCADE');

        t.foreign('usuario_aliado')
            .references('usuario_aliado')
            .inTable('aliados')

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
    return knex.schema.dropTable('usuarios_por_convenio');
};