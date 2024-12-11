const swaggerUi = require("swagger-ui-express");
const URL_API_CONTROLLER = require("./routes/API.js");
const swaggerDocument = require("../apps/configs/Swagger.json");

const Root = async (app, express) => {
	try {
		app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		app.use("/api", URL_API_CONTROLLER);

		console.log(`Router is Ready!`);
	} catch (err) {
		console.log(`Api Bridges catch err: ${err}`);
	}
};

module.exports = Root;
