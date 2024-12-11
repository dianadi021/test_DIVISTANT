const mongoose = require("mongoose");
const { connect } = mongoose;

const APP_URL = process.env.APP_URL || `localhost`;
const APP_IPV4 = process.env.APP_IPV4 || `127.0.0.1`;

const DB_PORT = 27017;
const DB_DATABASE = process.env.DB_DATABASE || `exampleDB`;
const APP_HOST = APP_URL !== `localhost` ? APP_URL : APP_IPV4 !== `127.0.0.1` ? APP_IPV4 : APP_URL || APP_IPV4;

const DB_CONNECT = process.env.DB_CONNECT;
const options = { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true };
const DB_SERVER = process.env.DB_MONGOD_URL || `${DB_CONNECT}://${APP_HOST}:${DB_PORT}/${DB_DATABASE}`;

const DB_CONNECTIONS = async () => {
	try {
		await connect(`${DB_SERVER}`, options)
			.then((_) => {
				console.log("Success connected to MongoDB!");
			})
			.catch((err) => {
				throw new Error(err);
			});
	} catch (err) {
		console.error(`Failure to connect ${DB_CONNECT} error: ${err}`);
	}
};

module.exports = { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose };
