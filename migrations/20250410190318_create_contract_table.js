/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('convenio', function(t) {
        t.increments('id_convenio').primary();
        t.text('link_contrato').notNull();
        t.boolean('estatus_firma_aliado').notNull().defaultTo(false);
        t.boolean('estatus_firma_escuela').notNull().defaultTo(false);
        t.boolean('finalizado').notNull().defaultTo(false);
        t.date('fecha_inicio').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('convenio');
};
