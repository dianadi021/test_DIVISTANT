(async () => {
	try {
		require("dotenv").config({ path: '.env' });
		await require("./src/app.js");
	} catch (err) {
		console.log(`Error starting server! catch: ${err}`);
	}
})();
