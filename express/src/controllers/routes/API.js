const { Router } = require("express");
const router = new Router();

const AuthInterfaces = require("../interfaces/AuthInterfaces.js");
const AuthService = require("../services/users/AuthService.js");

const Auth = new AuthService();
const AuthEndpoint = new AuthInterfaces(Auth);

const Users = require('./Users.js');
const Books = require('./Books.js');
try {
 router.use(AuthEndpoint.SetupRouter());

 router.use(Users);
 router.use(Books);
} catch (err) {
 console.log(`URL API catch err: ${err}`);
}

module.exports = router;
