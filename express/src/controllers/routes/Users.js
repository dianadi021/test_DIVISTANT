const { Router } = require("express");
const router = new Router();

const ServiceInterfaces = require("../interfaces/ServiceInterfaces.js");

const UserService = require("../services/users/UserService.js");

const Users = new UserService();
const UserEndpoint = new ServiceInterfaces(Users);

(async () => {
	try {
		router.use("/users", UserEndpoint.SetupRouter());
	} catch (err) {
		console.log(`Endpoint catch err: ${err}`);
	}
})();

module.exports = router;
