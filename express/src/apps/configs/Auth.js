const Bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

if (process.env.DB_CONNECT === "postgre") {
 try {
  const { $conn } = require("../database/Connect.js");
  const localStrategy = new LocalStrategy(async (username, password, done) => {
   try {
    const res = await $conn.query("select usr.id, usr.username, usr.email, usr.password from users usr where usr.username = $1", [username]);
    const user = res.rows[0];
    if (!user) return done(null, false, { message: "User not found" });

    // Validasi password
    const isValid = await Bcrypt.compare(password, user.password);
    if (!isValid) return done(null, false, { message: "Incorrect password" });

    return done(null, user);
   } catch (err) {
    return done(err);
   }
  });

  passport.use(localStrategy);

  // Serialize user (disimpan dalam session)
  passport.serializeUser(async (user, done) => {
   done(null, user.id);
  });

  // Deserialize user (ambil detail user dari database)
  passport.deserializeUser(async (id, done) => {
   try {
    const res = await $conn.query("select usr.id, usr.username, usr.email, usr.password from users usr where usr.id = $1", [id]);
    const user = res.rows[0];
    
    done(null, user);
   } catch (err) {
    done(err);
   }
  });

  console.log("Auth is ready");
 } catch ($err) {
  console.log(`Passport Auth Strategy Method Catch error: ${$err}`);
 }
 module.exports = passport;
}
