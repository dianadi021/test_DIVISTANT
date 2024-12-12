export default class Auth {
 CheckTokenJWT(req, res, next) {
  try {
   const token = localStorage.getItem("login_token");
   return token ? true : false;
  } catch (err) {}
 }

 RemoveTokenJWT(req, res, next) {
  try {
   localStorage.removeItem("login_token");
  } catch (err) {}
 }
}
