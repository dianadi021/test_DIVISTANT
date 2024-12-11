const { Router } = require("express");
const router = new Router();

const ServiceInterfaces = require("../interfaces/ServiceInterfaces.js");

const UserService = require("../services/users/UserService.js");

const Users = new UserService();
const UserEndpoint = new ServiceInterfaces(Users);

(async () => {
 try {
  setTimeout(async function () {
   await UserEndpoint.SetupData();
  }, 7500);

  router.use("/users", UserEndpoint.SetupRouter());
 } catch (err) {
  console.log(`Endpoint catch err: ${err}`);
 }
})();

module.exports = router;
