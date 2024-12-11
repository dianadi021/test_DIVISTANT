const fs = require("fs");
const https = require("https");

const express = require("express");
const app = new express();

const APP_PORT = process.env.APP_PORT || 9000;
const APP_URL = process.env.APP_URL || `localhost`;
const APP_STATUS = process.env.APP_STATUS || "ondev";

let sslCertificate = undefined;
if (APP_STATUS !== "ondev") {
	sslCertificate = {
		key: fs.readFileSync(`/etc/letsencrypt/live/${APP_URL}/privkey.pem`),
		cert: fs.readFileSync(`/etc/letsencrypt/live/${APP_URL}/cert.pem`),
		ca: fs.readFileSync(`/etc/letsencrypt/live/${APP_URL}/fullchain.pem`),
	};
}

(async () => {
	try {
		await require("moment-timezone");

		// Server Services
		await require("./apps/Server.js")(app, express);

		// Router Services
		await require("./controllers/Router.js")(app, express);

		if (APP_STATUS !== "ondev") {
			https.createServer(sslCertificate, app).listen(APP_PORT, () => {
				console.log(`App listening on https://${APP_URL}:${APP_PORT} 🚀`);
			});
		} else {
			app.listen(APP_PORT, () => {
				console.log(`App listening on http://${APP_URL}:${APP_PORT} 🚀`);
			});
		}
	} catch (err) {
		console.log(`Server listening error! catch: ${err}`);
	}
})();
