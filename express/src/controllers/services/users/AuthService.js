const Bcrypt = require("bcrypt");

const Validator = require("../../../tools/Validator.js");
const { IsSet, SetRequest, SetParams, IsValidRequest, SetObject } = new Validator();

const { $conn } = require("../../../apps/database/Connect.js");

const Auth = require("../../middlewares/Auth.js");
const { CheckTokenJWT } = new Auth();

class AuthService {
 async LoginAccount(req, res, next) {
  return new Promise(async (resolve, reject) => {
   const { username, password } = SetRequest(req) ? SetRequest(req) : SetParams(req);
   const res = await $conn.query("SELECT id, username, email, password FROM users WHERE username = $1", [username]);
   const user = res.rows[0];
   if (!user) {
    return reject([false, "User not found"]);
   }

   const isValid = await Bcrypt.compare(password, user.password);
   if (!isValid) {
    reject([false, "Incorrect password"]);
   }

   const jwt = require("jsonwebtoken");
   const APP_SECRET = "secret-dianadi021";

   const $sessDatas = await $conn.query("SELECT * FROM user_session_jwt WHERE id_user = $1", [user.id]);
   const tmpSessData = $sessDatas.rows;

   const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, APP_SECRET, { expiresIn: "1d" });
   if (!(tmpSessData).length) {
    await $conn.query("INSERT INTO user_session_jwt (id_user, jwt) VALUES ($1, $2)", [user.id, token]);
   }

   resolve(["Success Login", token]);
  });
 }

 async LogoutAccount(req, res, next) {
  return new Promise(async (resolve, reject) => {
   const isValidToken = CheckTokenJWT(req, res, next);
   if (isValidToken) {
    const $sessDatas = await $conn.query("SELECT * FROM user_session_jwt WHERE id_user = $1", [isValidToken.id]);
    console.log(isValidToken);

    if ($sessDatas.rows.length === 1) {
     await $conn.query("DELETE FROM user_session_jwt WHERE id_user = $1", [isValidToken.id]);
     resolve("Success logout");
    } else {
     reject(`Failure logout`);
    }
   }
  });
 }
}

module.exports = AuthService;
