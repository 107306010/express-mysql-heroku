var mysql = require("mysql");
var db = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b53e508bf3d1a3',
    password: 'f225a8f1',
    database: 'heroku_25ee65053a55ba4',
});
module.exports = db;