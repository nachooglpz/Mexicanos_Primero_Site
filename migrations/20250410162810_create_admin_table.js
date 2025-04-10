/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Administrador', function(t) {
        t.string('Usuario_admin').primary();
        t.string('Nombre').notNull();
        t.string('Contraseña').notNull();
        t.string('Email').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Administrador');
};
