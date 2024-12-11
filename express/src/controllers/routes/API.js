const { Router } = require("express");
const router = new Router();

const Users = require("./Users.js");

try {
  router.use(Users);
} catch (err) {
  console.log(`URL API catch err: ${err}`);
}

module.exports = router;
