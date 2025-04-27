/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('administradores_de_escuela', function(t) {
        t.string('usuario_escuela').primary();
        t.string('nombre').notNull();
        t.string('contrasena').notNull();
        t.string('email').notNull();
        t.string('escuela').notNull();
        t.text('direccion').notNull();
        t.string('cct').notNull();
        t.boolean('estatus_activo').notNull().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('administradores_de_escuela');
};
