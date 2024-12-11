if (process.env.DB_CONNECT === "postgre") {
 const Bcrypt = require("bcrypt");
 const { $conn } = require("../../database/Connect.js");

 const Generator = require("../../../tools/Generator.js");
 const $genrate = new Generator();

 class UserModel {
  constructor(username, email, password) {
   this.name = username;
   this.name = email;
   this.name = password;
  }

  async Create($datas) {
   try {
    const { username, email, password } = $datas;
    const tmpPass = await Bcrypt.hash(password, 12);

    $query = "INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3)";
    const callback = await $conn.query($query, [username, email, tmpPass]);
    return callback;
   } catch ($err) {
    return `Kesalahan insert data ${$err}`;
   }
  }
 }

 module.exports = UserModel;
}
