require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = {
    async getUsers() {
        try {
            const users = await new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
            return users.rows;
        } catch (err) {
            return null
        }
    },

    async createUser(user) {
        const LastID = await new Promise((resolve, reject) => {
            pool.query('INSERT INTO users (name, age) VALUES ($1, $2)', [user.name, user.age], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.LastID)
                }
            });
        });
        return { id: LastID, ...user};
    },

    async updateUser(id, updatedData) {
        const changes = await new Promise((resolve, reject) => {
            pool.query('UPDATE users SET name = $1, age = $2 WHERE id = $3', [updatedData.name, updatedData.age, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes)
                }
            });
        });
        if (changes === 0) {
            return null
        }
        return this.getUserById(id)
    },

    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            pool.query('DELETE FROM users WHERE id = $1', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.rowCount)
                }
            });
        });
        return changes > 0
    },

    async getUserById(id) {
        const user = await new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE id = $1', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row)
                }
            });
        });
        return user.rows
    }
};

