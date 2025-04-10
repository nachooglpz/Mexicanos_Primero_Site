/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Usuarios_por_convenio', function(t) {
        t.integer('ID_convenio').unsigned().notNull();
        t.string('Usuario_aliado').notNull();
        t.string('Usuario_escuela').notNull();

        // Foreign key de ID_convenio
        t.foreign('ID_convenio')
            .references('ID_convenio')
            .inTable('Convenio')
            .onDelete('CASCADE');

        t.foreign('Usuario_aliado')
            .references('Usuario_aliado')
            .inTable('Aliados')

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
    return knex.schema.dropTable('Usuarios_por_convenio');
};