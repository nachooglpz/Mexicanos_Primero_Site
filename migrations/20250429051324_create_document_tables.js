/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    // First drop existing tables if they exist
    await knex.schema.dropTableIfExists('documentos_escuelas');
    await knex.schema.dropTableIfExists('documentos_aliados');
    await knex.schema.dropTableIfExists('documentos_admin');
    await knex.schema.dropTableIfExists('documentos');

    // Create base documentos table
    await knex.schema.createTable('documentos', function(t) {
        t.increments('id_documento').primary();
        t.string('titulo', 255).notNullable();
        t.text('link').notNullable();
        t.timestamp('fecha_subida').defaultTo(knex.fn.now());
    });

    // Create documentos_escuelas table
    await knex.schema.createTable('documentos_escuelas', function(t) {
        t.integer('id_documento')
         .references('id_documento')
         .inTable('documentos')
         .onDelete('CASCADE');
        t.string('usuario_escuela')
         .references('usuario_escuela')
         .inTable('administradores_de_escuela')
         .onDelete('CASCADE');
        t.primary(['id_documento', 'usuario_escuela']);
    });

    // Create documentos_aliados table
    await knex.schema.createTable('documentos_aliados', function(t) {
        t.integer('id_documento')
         .references('id_documento')
         .inTable('documentos')
         .onDelete('CASCADE');
        t.string('usuario_aliado')
         .references('usuario_aliado')
         .inTable('aliados')
         .onDelete('CASCADE');
        t.primary(['id_documento', 'usuario_aliado']);
    });

    // Create documentos_admin table
    return knex.schema.createTable('documentos_admin', function(t) {
        t.integer('id_documento')
         .references('id_documento')
         .inTable('documentos')
         .onDelete('CASCADE');
        t.string('usuario_admin')
         .references('usuario_admin')
         .inTable('administrador')
         .onDelete('CASCADE');
        t.primary(['id_documento', 'usuario_admin']);
    });
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists('documentos_escuelas');
    await knex.schema.dropTableIfExists('documentos_aliados');
    await knex.schema.dropTableIfExists('documentos_admin');
    return knex.schema.dropTableIfExists('documentos');
}
