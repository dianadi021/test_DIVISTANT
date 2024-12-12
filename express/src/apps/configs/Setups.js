const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

const APP_SECRET = process.env.SESSIONS_SECRET || `secret-dianadi021`;

module.exports = async (app, express) => {
 try {
  app.use(cors());
  app.use(morgan("short"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  if (process.env.DB_CONNECT === "postgre") {
   var passport = require("./Auth.js");
   var PgStore = require("connect-pg-simple")(session);
   var { DB_SERVER, $conn } = require("../database/Connect.js");
   const sessionStore = new PgStore({
    pool: $conn, // Koneksi PostgreSQL
    tableName: "user_session_express", // Nama tabel sesi (default: 'session')
   });

   app.use(
    session({
     store: sessionStore,
     secret: `${APP_SECRET}`,
     resave: false,
     saveUninitialized: false,
     cookie: {
      // 1Day
      maxAge: 1000 * 60 * 60 * 24,
     }, // Atur secure true untuk HTTPS
    })
   );

   app.use(passport.authenticate("session"));
  }

  app.use(passport.initialize());
  app.use(passport.session());
 } catch (err) {
  console.log(`Setup catch err: ${err}`);
 }
};
