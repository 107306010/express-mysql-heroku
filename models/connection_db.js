const config = require('../config/developement_config');
const mysqlt = require("mysql");

const poolConnection = mysqlt.createPool({
    connectionLimit: config.mysql.connectionLimit,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

poolConnection.getConnection(function (err, connection) {
    if (err) {
        console.log('connecting error!');
        return;
    }
    console.log('connecting success');
    connection.release();
});

module.exports = poolConnection;