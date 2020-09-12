require('dotenv').config();

module.exports = {
    mysql: {
        connectionLimit: process.env.connectionLimit,
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
}