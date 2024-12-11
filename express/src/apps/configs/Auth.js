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

module.exports = async ($conn = null) => {
 if (process.env.DB_CONNECT === "mongodb") {
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
 }

 if (process.env.DB_CONNECT === "postgre") {
  passport.use(
   new LocalStrategy(async (username, password, done) => {
    try {
     const res = await $conn.query("select usr.username, usr.email from users usr where usr.username = $1", [username]);
     const user = res.rows[0];
     if (!user) return done(null, false, { message: "User not found" });

     // Validasi password
     const isValid = await bcrypt.compare(password, user.password);
     if (!isValid) return done(null, false, { message: "Incorrect password" });

     return done(null, user);
    } catch (err) {
     return done(err);
    }
   })
  );

  // Serialize user (disimpan dalam session)
  passport.serializeUser((user, done) => {
   done(null, user.id);
  });

  // Deserialize user (ambil detail user dari database)
  passport.deserializeUser(async (id, done) => {
   try {
    const res = await $conn.query("select usr.id, usr.username, usr.email from users usr where usr.id = $1", [id]);
    const user = res.rows[0];
    done(null, user);
   } catch (err) {
    done(err);
   }
  });
 }
};
