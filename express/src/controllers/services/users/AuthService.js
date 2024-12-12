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
    return reject("User not found");
   }

   const isValid = await Bcrypt.compare(password, user.password);
   if (!isValid) {
    reject("Incorrect password");
   }

   const jwt = require("jsonwebtoken");
   const APP_SECRET = process.env.SESSIONS_SECRET || "secret-dianadi021";

   const $sessDatas = await $conn.query("SELECT * FROM user_session_jwt WHERE id_user = $1", [user.id]);
   if ($sessDatas.rows.length !== 1) {
    const token = jwt.sign({ email: user.email, username: user.username }, APP_SECRET, { expiresIn: "1d" });
    await $conn.query("INSERT INTO user_session_jwt (id_user, jwt) VALUES ($1, $2)", [user.id, token]);
    resolve(["Success Login", token]);
   } else {
    reject(`Failure Login`);
   }
  });
 }

 async LogoutAccount(req, res, next) {
  return new Promise(async (resolve, reject) => {
   const isValidToken = CheckTokenJWT(req, res, next);
   if (isValidToken) {
    const { username } = SetRequest(req) ? SetRequest(req) : SetParams(req);
    if (isValidToken.username !== username) {
     reject("User tidak valid");
    }

    const res = await $conn.query("SELECT id, username, email, password FROM users WHERE username = $1", [username]);
    const user = res.rows[0];
    if (!user) {
     reject("User not found");
    }

    const $sessDatas = await $conn.query("SELECT * FROM user_session_jwt WHERE id_user = $1", [user.id]);
    if ($sessDatas.rows.length === 1) {
      await $conn.query("DELETE FROM user_session_jwt WHERE ID_USER = $1", [user.id]);
     resolve("Success logout");
    } else {
     reject(`Failure logout`);
    }
   }
  });
 }
}

module.exports = AuthService;
