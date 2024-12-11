const ResponseCode = require("../../apps/configs/ResponseCode.js");

const { graphqlHTTP } = require("express-graphql");
const passport = require("passport");

const { Router } = require("express");
const router = new Router();

class AuthInterfaces {
	constructor(modelService) {
		this._Service = modelService;
	}

	SetupRouter() {
		router.post("/login", passport.authenticate("local"), async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.LoginAccount(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (isValid) {
					return res.status(ResponseCode.OKE).json({ status: true, message: Callback });
				} else {
					throw new Error(`${Callback}`);
				}
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `URL Endpoint Method catch ${err}` });
			}
		});

		router.get("/logout", this._Service.isAuthenticated, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.LogoutAccount(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (isValid) {
					return res.status(ResponseCode.OKE).json({ status: true, message: Callback });
				} else {
					throw new Error(`${Callback}`);
				}
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `URL Endpoint Method catch ${err}` });
			}
		});

		return router;
	}
}

module.exports = AuthInterfaces;
