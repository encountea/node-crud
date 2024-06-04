require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL
);`;

pool.query(createTableQuery, (err, res) => {
    if (err) {
      console.error('Ошибка при создании таблицы:', err);
    } else {
      console.log('Таблица успешно создана');
    }
    pool.end();
});