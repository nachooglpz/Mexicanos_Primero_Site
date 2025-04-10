/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Administradores_de_Escuela', function(t) {
        t.string('Usuario_escuela').primary();
        t.string('Nombre').notNull();
        t.string('Contraseña').notNull();
        t.string('Email').notNull();
        t.string('Escuela').notNull();
        t.text('Direccion').notNull();
        t.string('CCT').notNull();
        t.boolean('Estatus_activo').notNull().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Administradores_de_Escuela');
};
