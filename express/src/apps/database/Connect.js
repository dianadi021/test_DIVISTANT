if (process.env.DB_CONNECT === "mongodb") {
	const { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose } = require("./connections/MongoDB.js");
	module.exports = { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose };
}
