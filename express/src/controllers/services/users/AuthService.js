const ResponseCode = require("../../../apps/configs/ResponseCode.js");

const isAuthenticated = (req, res, next) => {
	return new Promise(async (resolve, reject) => {
		if (req.isAuthenticated()) {
			return resolve(next());
		}
		return res.status(ResponseCode.UNAUTHORIZED).json({ status: ResponseCode.UNAUTHORIZED, message: `Unauthorized` });
	});
};

class AuthService {
	async LoginAccount(req, res) {
		return new Promise(async (resolve, reject) => {
			if (await req.isAuthenticated()) {
				return resolve(`Success Login`);
			} else {
				return reject(`Failure Login`);
			}
		});
	}

	async LogoutAccount(req, res) {
		return new Promise(async (resolve, reject) => {
			if (await req.logout()) {
				return resolve(`Success Logout`);
			} else {
				return reject(`Failure Logout`);
			}
		});
	}

	isAuthenticated = isAuthenticated;
}

module.exports = AuthService;
