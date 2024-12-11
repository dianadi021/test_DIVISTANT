const { DB_CONNECTIONS } = require("./database/Connect.js");

module.exports = async (app, express) => {
	try {
		// Database connections
		await DB_CONNECTIONS();

		// All NodeJS imported library
		await require("./configs/Setups.js")(app, express);
	} catch (err) {
		console.log(`Server error! catch: ${err}`);
	}
};
