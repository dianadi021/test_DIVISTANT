const cors = require("cors");
const morgan = require("morgan");

// Konfigurasi CORS
const corsOptions = {
 origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
 methods: ["GET", "POST", "PUT", "DELETE"], // Method yang diizinkan
 allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
 credentials: true, // Jika menggunakan cookie/session
};

module.exports = async (app, express) => {
 try {
  app.use(cors(corsOptions));
  app.use(morgan("short"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
 } catch (err) {
  console.log(`Setup catch err: ${err}`);
 }
};
