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

  if (process.env.DB_CONNECT === "mongodb") {
   var passport = require("passport");
   var MongoStore = require("connect-mongo");
   var { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose } = require("../database/Connect.js");
   const sessionStore = new MongoStore({ mongoUrl: DB_SERVER, collectionName: "sessions" });

   app.use(
    session({
     secret: `${APP_SECRET}`,
     resave: false,
     saveUninitialized: false,
     store: sessionStore,
     cookie: {
      // 1Day
      maxAge: 1000 * 60 * 60 * 24,
     },
    })
   );

   // PASSPORT SECTIONS START
   app.use(passport.authenticate("session"));

   // Not Fixed Users Model;
   await require("./Auth.js");
  }

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
