const MySql = require("mysql2");

const DB_CONNECT = process.env.DB_CONNECT;

const $conn = MySql.createConnection({
 host: `${process.env.DB_HOST}`,
 user: `${process.env.DB_USERNAME}`,
 password: `${process.env.DB_PASSWORD}`,
 database: `${process.env.DB_DATABASE}`,
});

const DB_CONNECTIONS = async () => {
 try {
  await $conn
   .connect()
   .then((_) => {
    console.log("Success connected to Server!");
   })
   .catch((err) => {
    throw new Error(err);
   });
 } catch (err) {
  console.error(`Failure to connect ${DB_CONNECT} error: ${err}`);
 }
};

module.exports = { DB_CONNECTIONS, $conn };
