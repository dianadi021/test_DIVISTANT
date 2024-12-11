const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

if (process.env.DB_CONNECT === "mongodb") {
 var MongoStore = require("connect-mongo");
 var { DB_CONNECTIONS, DB_SERVER, APP_HOST, APP_URL, mongoose } = require("../database/Connect.js");
}

if (process.env.DB_CONNECT === "postgre") {
 var PgStore = require("connect-pg-simple")(session);
 var { DB_SERVER, $conn } = require("../database/Connect.js");
}

const APP_SECRET = process.env.SESSIONS_SECRET || `secret-dianadi021`;

module.exports = async (app, express) => {
 try {
  app.use(cors());
  app.use(morgan("short"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  if (process.env.DB_CONNECT === "mongodb") {
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
  }

  if (process.env.DB_CONNECT === "postgre") {
   app.use(
    session({
     store: new PgStore({
      $conn, // Koneksi PostgreSQL
      tableName: "session", // Nama tabel sesi (default: 'session')
     }),
     secret: `${APP_SECRET}`,
     resave: false,
     saveUninitialized: false,
     cookie: { secure: false }, // Atur secure true untuk HTTPS
    })
   );
  }

  // Not Fixed Users Model;
  await require("./Auth.js")($conn);

  app.use(passport.initialize());
  app.use(passport.session());
 } catch (err) {
  console.log(`Setup catch err: ${err}`);
 }
};
