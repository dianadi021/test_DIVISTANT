const ResponseCode = require("../../apps/configs/ResponseCode.js");

class AuthInterfaces {
 constructor(modelService) {
  this._Service = modelService;
 }

 SetupRouter() {
  const { Router } = require("express");
  const router = new Router();

  router.post("/login", async (req, res, next) => {
   try {
    const [message, token] = await this._Service
     .LoginAccount(req, res, next)
     .then((result) => result)
     .catch((err) => [false, err]);

    if (token) {
     return res.status(ResponseCode.OKE).json({ status: true, message: message, token: token });
    }
   } catch (err) {
    return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `URL Endpoint Method catch ${err}` });
   }
  });

  router.post("/logout", async (req, res, next) => {
   try {
    const [isValid, callback] = await this._Service
     .LogoutAccount(req, res, next)
     .then((result) => [true, result])
     .catch((err) => [false, err]);
    console.log(callback);

    if (isValid) {
     return res.status(ResponseCode.OKE).json({ status: true, message: "Berhasil logout" });
    } else {
     throw new Error(callback ? callback : `Tidak ada session user`);
    }
   } catch (err) {
    return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `URL Endpoint Method catch ${err}` });
   }
  });

  return router;
 }
}

module.exports = AuthInterfaces;
