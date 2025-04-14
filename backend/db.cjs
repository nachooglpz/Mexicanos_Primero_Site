const { Pool } = require('pg');

const pool = new Pool({
    user: 'mpadmin',
    password: 'mpadmin',
    host: 'localhost',
    port: 5432,
    database: 'mexicanosprimero'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};