/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('aliados', function(t) {
        t.string('usuario_aliado').primary();
        t.string('nombre').notNull();
        t.string('contrasena').notNull();
        t.string('email').notNull();
        t.string('empresa').notNull();
        t.string('sector').notNull();
        t.text('direccion').notNull();
        t.boolean('estatus_activo').notNull().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('aliados');
};
