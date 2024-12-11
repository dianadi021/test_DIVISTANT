if (process.env.DB_CONNECT === "postgre") {
 class UserModel {
  constructor(username, email, password) {
   this.username = username;
   this.email = email;
   this.password = password;
  }

  GetDataFormat() {
   return {
    username: {
     type: "String",
     unique: true,
    },
    email: {
     type: "String",
     unique: true,
    },
    password: {
     type: "String",
    },
   };
  }
 }

 module.exports = UserModel;
}
