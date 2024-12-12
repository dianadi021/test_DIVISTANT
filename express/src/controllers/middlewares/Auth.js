const Validator = require("../../tools/Validator.js");
const { IsSet, SetRequest, SetParams, IsValidRequest, SetObject } = new Validator();

const ResponseCode = require("../../apps/configs/ResponseCode.js");

class Auth {
 // Postman Basic Auth
 PostmanBasicAuth(req, res, next) {
  try {
   const [isAuthMethod, Auth] = req.headers.authorization.split(" ");

   if (!isAuthMethod.includes("Basic")) {
    return res.status(ResponseCode.BAD_REQUEST).json({ status: false, messages: `Harus login Basic Auth, terlebih dahulu!` });
   }

   const decodeAuthBasic = Buffer.from(Auth, "base64").toString("ascii");
   const [username, password] = decodeAuthBasic.split(":");

   // Harusnya bisa login/auth menggunakan data dari Database 'Users'
   if (username !== "admin" || password !== "Koknanya?") {
    return res.status(ResponseCode.UNAUTHORIZED).json({ status: false, messages: `Unauthorized! Username atau Password salah!` });
   } else {
    return next();
   }
  } catch (err) {
   return res.status(ResponseCode.SERVER_ERROR).json({ status: false, messages: `Function basic auth catch error: ${err}` });
  }
 }

 GetTokenJWT(req, res) {
  try {
   const FormatAuth = { email: { type: "String", required: true }, username: { type: "String", required: true } };
   const { email, username } = CheckingKeyReq(req.body, req.query, req.body.data);

   if (IsEmptyValue(email) || IsEmptyValue(username)) {
    return res.status(ResponseCode.NOT_FOUND).json({ status: false, messages: `Format tidak sesuai atau input value kosong!`, FormatAuth });
   }

   const token = jwt.sign({ email: email, username: username }, process.env.SESSIONS_SECRET, { expiresIn: "1d" });

   return res.status(ResponseCode.CREATED).json({ status: true, messages: `Berhasil membuat token!`, token });
  } catch (err) {
   return res.status(ResponseCode.SERVER_ERROR).json({ status: false, messages: `Function Generate Token catch error: ${err}` });
  }
 }

 // JWT Auth
 MiddlewereCheckToken(req, res, next) {
  try {
   const userAgent = req.get("User-Agent");
   const { token } = SetParams(req) ? SetParams(req) : SetRequest(req);

   if (userAgent.includes("PostmanRuntime")) {
    var [_, validToken] = !token ? req.headers.authorization.split(" ") : ["Bearer", token];
   }
   const tmpToken = userAgent.includes("Mozilla") ? token : validToken;

   const APP_SECRET = "secret-dianadi021";
   const jwt = require("jsonwebtoken");
   const status = jwt.verify(tmpToken, APP_SECRET);

   if (status) {
    next();
   } else {
    throw new Error(status);
   }
  } catch (err) {
   const { name } = err;

   if (name == "JsonWebTokenError") {
    return res.status(ResponseCode.NOT_FOUND).json({ status: false, messages: `Token Tidak Benar/Invalid Token catch error: ${err}` });
   } else if (name == "TokenExpiredError") {
    return res.status(ResponseCode.SERVER_TIMEOUT).json({ status: false, messages: `Token Kadaluarsa/Expird catch error: ${err}` });
   } else if (name == "TypeError") {
    return res.status(ResponseCode.SERVER_ERROR).json({ status: false, messages: `Token tidak sesuai! catch error: ${err}` });
   } else {
    return res.status(ResponseCode.SERVER_ERROR).json({ status: false, messages: `Function Checking Token catch error: ${err}` });
   }
  }
 }

 CheckTokenJWT(req, res, next) {
  try {
   const { token } = SetRequest(req) ? SetRequest(req) : SetParams(req);

   const [_, validToken] = !token ? req.headers.authorization.split(" ") : ["Bearer", token];
   const tmpToken = validToken ? validToken : token;

   const APP_SECRET = process.env.SESSIONS_SECRET || "secret-dianadi021";
   const jwt = require("jsonwebtoken");
   return jwt.verify(tmpToken, APP_SECRET);
  } catch (err) {
   const { name } = err;

   if (name == "JsonWebTokenError") {
    return res.status(ResponseCode.NOT_FOUND).json({ status: false, messages: `Token Tidak Benar/Invalid Token catch error: ${err}` });
   } else if (name == "TokenExpiredError") {
    return res.status(ResponseCode.SERVER_TIMEOUT).json({ status: false, messages: `Token Kadaluarsa/Expird catch error: ${err}` });
   } else if (name == "TypeError") {
    return res.status(ResponseCode.SERVER_ERROR).json({ status: false, messages: `Token tidak sesuai! catch error: ${err}` });
   } else {
    return res.status(ResponseCode.SERVER_ERROR).json({ status: false, messages: `Function Checking Token catch error: ${err}` });
   }
  }
 }
}

module.exports = Auth;
