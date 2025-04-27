/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.createTable('documentos', function(t) {
        t.increments('id_documento').primary(); // ID autoincremental como clave primaria
        t.string('titulo', 255).notNullable(); // Título del documento
        t.text('link').notNullable(); // Link del documento
        t.timestamp('fecha_subida').defaultTo(knex.fn.now()); // Fecha de subida
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.dropTable('documentos'); // Elimina la tabla si se revierte la migración
};
