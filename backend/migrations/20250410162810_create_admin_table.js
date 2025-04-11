/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('administrador', function(t) {
        t.string('usuario_admin').primary();
        t.string('nombre').notNull();
        t.string('contraseña').notNull();
        t.string('email').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('administrador');
};
