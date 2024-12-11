if (process.env.DB_CONNECT === "mongodb") {
 const { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose } = require("./connections/MongoDB.js");
 module.exports = { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose };
}

if (process.env.DB_CONNECT === "mysql") {
 const { DB_CONNECTIONS, $conn } = require("./connections/MySql.js");
 module.exports = { DB_CONNECTIONS, $conn };
}

if (process.env.DB_CONNECT === "postgre") {
 const { DB_CONNECTIONS, $conn } = require("./connections/Postgres.js");
 module.exports = { DB_CONNECTIONS, $conn };
}
