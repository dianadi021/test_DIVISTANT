const { Router } = require("express");
const router = new Router();

const ServiceInterfaces = require("../interfaces/ServiceInterfaces.js");

const BookService = require("../services/BookService.js");

const Books = new BookService();
const BookEndpoint = new ServiceInterfaces(Books);

const Auth = require("../middlewares/Auth.js");
const { MiddlewereCheckToken } = new Auth();

(async () => {
 try {
  setTimeout(async function () {
   await BookEndpoint.SetupData();
  }, 7500);

  router.use(MiddlewereCheckToken);
  router.use("/books", BookEndpoint.SetupRouter());
 } catch (err) {
  console.log(`Endpoint catch err: ${err}`);
 }
})();

module.exports = router;
