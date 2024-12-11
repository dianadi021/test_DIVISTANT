(async () => {
	try {
		// require("dotenv").config({ path: '.env' });
		// require("dotenv").config({ path: '.env.production' });
		await require("dotenv").config({ path: ".env.development" });
		await require("./src/app.js");
	} catch (err) {
		console.log(`Error starting server! catch: ${err}`);
	}
})();
