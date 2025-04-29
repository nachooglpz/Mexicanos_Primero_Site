import knex from 'knex';
import config from './knexfile.js';

const db = knex(config.development);

async function resetMigrations() {
    try {
        // First drop all tables using a more thorough approach
        await db.raw(`
            DO $$ 
            DECLARE
                r RECORD;
                cmd text;
            BEGIN
                -- Drop all tables in public schema
                FOR r IN (
                    SELECT tablename 
                    FROM pg_tables 
                    WHERE schemaname = 'public'
                    AND tablename != 'spatial_ref_sys'
                ) LOOP
                    cmd := 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                    EXECUTE cmd;
                END LOOP;

                -- Reset sequences
                FOR r IN (
                    SELECT relname 
                    FROM pg_class 
                    WHERE relkind = 'S'
                    AND relnamespace = 'public'::regnamespace
                ) LOOP
                    cmd := 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.relname) || ' CASCADE';
                    EXECUTE cmd;
                END LOOP;
            END $$;
        `);

        console.log('Successfully reset all tables and sequences');

        // Explicitly drop migration tables
        await db.raw('DROP TABLE IF EXISTS knex_migrations CASCADE');
        await db.raw('DROP TABLE IF EXISTS knex_migrations_lock CASCADE');
        
        console.log('Successfully reset migration tracking tables');
    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        await db.destroy();
    }
}

resetMigrations();