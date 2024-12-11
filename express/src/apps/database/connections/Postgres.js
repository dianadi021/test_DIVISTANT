const { Pool } = require("pg");

const DB_CONNECT = process.env.DB_CONNECT;

const $conn = new Pool({
 host: `${process.env.DB_HOST}`,
 user: `${process.env.DB_USERNAME}`,
 password: `${process.env.DB_PASSWORD}`,
 database: `${process.env.DB_DATABASE}`,
 port: 5432,
});

const DB_CONNECTIONS = async () => {
 try {
  await $conn
   .connect()
   .then((_) => {
    console.log(`Success connected to ${DB_CONNECT} Server!`);
   })
   .catch((err) => {
    throw new Error(err);
   });
 } catch (err) {
  console.error(`Failure to connect ${DB_CONNECT} error: ${err}`);
 }
};

module.exports = { DB_CONNECTIONS, $conn };
