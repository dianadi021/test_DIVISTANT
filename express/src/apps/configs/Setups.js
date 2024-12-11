const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { DB_SERVER } = require("../database/Connect.js");
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
     secret: APP_SECRET,
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
   app.use(passport.initialize());
   app.use(passport.session());

   // Not Fixed Users Model;
   await require("./Auth.js");
  }
 } catch (err) {
  console.log(`Setup catch err: ${err}`);
 }
};
