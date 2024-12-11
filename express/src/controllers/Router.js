const URL_API_CONTROLLER = require("./routes/API.js");

const Root = async (app, express) => {
	try {
		app.use("/api", URL_API_CONTROLLER);

		console.log(`Router is Ready!`);
	} catch (err) {
		console.log(`Api Bridges catch err: ${err}`);
	}
};

module.exports = Root;
