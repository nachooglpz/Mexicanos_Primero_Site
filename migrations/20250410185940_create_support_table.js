/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Tipos_de_apoyo_a_brindar', function(t) {
        t.string('Usuario_aliado').notNullable();
        t.string('Tipo_Apoyo').notNullable();

        // Define la foreign key
        t.foreign('Usuario_aliado')
        .references('Usuario_aliado')
        .inTable('Aliados')
        .onDelete('CASCADE'); // si se borra un admin, se borran sus necesidades
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Tipos_de_apoyo_a_brindar');
};
