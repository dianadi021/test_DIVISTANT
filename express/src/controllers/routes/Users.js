const { Router } = require("express");
const router = new Router();

const AuthInterfaces = require("../interfaces/AuthInterfaces.js");
const AuthService = require("../services/users/AuthService.js");

const Auth = new AuthService();
const AuthEndpoint = new AuthInterfaces(Auth);

// const ServiceInterfaces = require("../interfaces/ServiceInterfaces.js");
// const RoleService = require("../services/users/RoleService.js");

// const Roles = new RoleService();
// const RoleEndpoint = new ServiceInterfaces(Roles);

(async () => {
	try {
		// await RoleEndpoint.SetupData();

		router.use(AuthEndpoint.SetupRouter());
		// router.use("/roles", RoleEndpoint.SetupRouter());
	} catch (err) {
		console.log(`Endpoint catch err: ${err}`);
	}
})();

module.exports = router;
