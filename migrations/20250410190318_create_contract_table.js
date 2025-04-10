/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('Convenio', function(t) {
        t.increments('ID_convenio').primary();
        t.text('Link_contrato').notNull();
        t.boolean('Estatus_firma_aliado').notNull().defaultTo(false);
        t.boolean('Estatus_firma_escuela').notNull().defaultTo(false);
        t.boolean('Finalizado').notNull().defaultTo(false);
        t.date('Fecha_inicio').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('Convenio');
};
