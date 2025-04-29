import knex from 'knex';
import config from './knexfile.js';

const db = knex(config.development);

async function checkTables() {
    try {
        const tables = await db.raw(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);
        console.log('Tables in database:', tables.rows);
    } catch (error) {
        console.error('Error checking tables:', error);
    } finally {
        await db.destroy();
    }
}

checkTables();