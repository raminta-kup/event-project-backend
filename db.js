const mysql = require("mysql2");

const mysqlConfigBase = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
};

const eventProjectConnection = mysql.createConnection({
    ...mysqlConfigBase,
    database: "event_project"
});

module.exports = {
    eventProjectConnection
}