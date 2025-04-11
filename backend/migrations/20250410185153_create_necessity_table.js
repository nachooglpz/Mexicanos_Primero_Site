/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('necesidades', function(t) {
        t.string('usuario_escuela').notNullable();
        t.string('necesidad').notNullable();

        // Define la foreign key
        t.foreign('usuario_escuela')
        .references('usuario_escuela')
        .inTable('administradores_de_escuela')
        .onDelete('CASCADE'); // si se borra un admin, se borran sus necesidades
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('necesidades');
};
