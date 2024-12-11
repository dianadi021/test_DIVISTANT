const Bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const CheckAuth = async () => {
	try {
		const localStrategy = new LocalStrategy(async (username, password, done) => {
			console.log(`Ready to verify login user!`);
			const isUserReady = await UsersModel.findOne({ username: username.toLowerCase() });

			if (!isUserReady) {
				console.log(`No data about user!`);
				return done(null, false);
			}

			const isValid = await Bcrypt.compare(ConvertPasswordToHash(password), isUserReady.password);
			console.log(isValid);

			if (!isValid) {
				console.log(`User login failed!`);
				return done(null, false);
			}

			console.log(`User login success!`);
			return done(null, isUserReady);
		});

		passport.use(localStrategy);
	} catch (err) {
		console.log(`Passport Strategy Method Catch error: ${err}`);
	}
};

module.exports = async () => {
	try {
		const customFields = { username: "username", password: "password" };
		const passStrategy = new LocalStrategy(customFields, CheckAuth);

		passport.use(passStrategy);
		passport.serializeUser((user, done) => {
			done(null, user._id);
		});
		passport.deserializeUser(async (userID, done) => {
			const isUserReady = await UsersModel.findById(userID);

			if (!isUserReady) {
				console.log(`No data about user!`);
				return done(null, false);
			}

			return done(null, isUserReady);
		});

		console.log(`Auth is Ready!`);
	} catch (err) {
		console.log(`Passport Auth Strategy Method Catch error: ${err}`);
	}
};
