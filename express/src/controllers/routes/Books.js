const { Router } = require("express");
const router = new Router();

const ServiceInterfaces = require("../interfaces/ServiceInterfaces.js");

const BookService = require("../services/BookService.js");

const Books = new BookService();
const BookEndpoint = new ServiceInterfaces(Books);

(async () => {
 try {
  setTimeout(async function () {
   await BookEndpoint.SetupData();
  }, 7500);

  router.use("/books", BookEndpoint.SetupRouter());
 } catch (err) {
  console.log(`Endpoint catch err: ${err}`);
 }
})();

module.exports = router;
