/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Necesidades', function(t) {
        t.string('Usuario_escuela').notNullable();
        t.string('Necesidad').notNullable();

        // Define la foreign key
        t.foreign('Usuario_escuela')
        .references('Usuario_escuela')
        .inTable('Administradores_de_Escuela')
        .onDelete('CASCADE'); // si se borra un admin, se borran sus necesidades
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Necesidades');
};
