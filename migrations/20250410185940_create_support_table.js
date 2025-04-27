/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('tipos_de_apoyo_a_brindar', function(t) {
        t.string('usuario_aliado').notNullable();
        t.string('tipo_apoyo').notNullable();

        // Define la foreign key
        t.foreign('usuario_aliado')
        .references('usuario_aliado')
        .inTable('aliados')
        .onDelete('CASCADE'); // si se borra un admin, se borran sus necesidades
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('tipos_de_apoyo_a_brindar');
};
