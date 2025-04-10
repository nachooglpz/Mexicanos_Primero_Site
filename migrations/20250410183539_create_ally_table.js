/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Aliados', function(t) {
        t.string('Usuario_aliado').primary();
        t.string('Nombre').notNull();
        t.string('Contraseña').notNull();
        t.string('Email').notNull();
        t.string('Empresa').notNull();
        t.string('Sector').notNull();
        t.text('Direccion').notNull();
        t.boolean('Estatus_activo').notNull().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Aliados');
};
