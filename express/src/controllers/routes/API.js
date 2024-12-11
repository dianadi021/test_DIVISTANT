const { Router } = require("express");
const router = new Router();

try {
 if (process.env.DB_CONNECT === "mongodb") {
  const Users = require("./Users.js");
  router.use(Users);
 }
} catch (err) {
 console.log(`URL API catch err: ${err}`);
}

module.exports = router;
