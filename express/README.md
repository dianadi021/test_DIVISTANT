# Template OOP ExpressJS

Repository ini digunakan untuk pengembangan/development upgrading skill.

## Packages

### Back-End
> [<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />![version](https://img.shields.io/badge/version-21.7.1-blue)](https://nodejs.org/en/download) </br> 
> [<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />![version](https://img.shields.io/badge/version-4.19.2-blue)](https://expressjs.com/en/starter/installing.html) </br>
> [<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />![version](https://img.shields.io/badge/version-4.4.24-blue)](https://www.mongodb.com/try/download/community) </br>

## Repository

Kunjungi [Repository](https://github.com/dianadi021/fullstack-express-vue) untuk mendownload source code.

## Setting up Apps

1. **Installation**:

   - Clone repositori ini ke mesin lokal Anda.
   - Install dependencies menggunakan npm:

   ```cmd
   npm install
   ```
   ```cmd
   pnpm install
   ```

2. **Setting up Database @MongoDB**:

   - Konfigurasi file `.env` untuk database server @Back-End
   - Masukan nama `DB_DATABASE` sesuai dengan kebutuhan, dalam kasus ini saya memberi nama `DB_DATABASE="exampleDB"`
   - Konfigurasi pada `DB_USERNAME` dan `DB_PASSWORD`, menyesuaikan dengan konfigurasi local server pribadi. Jika kalian ingin menggunakan koneksi external menggunakan [MongoDB Cloud](https://www.mongodb.com/), silahkan isi `DB_MONGOD_URL` sesuai dengan yang tertera pada [MongoDB Cloud](https://www.mongodb.com/).

   ```env
   SESSIONS_SECRET=
   IS_USING_REDIS=false # true || false
   APP_STATUS=ondev # ondev || production

   APP_URL=localhost
   APP_IPV4=127.0.0.1
   APP_PORT=9000

   DB_CONNECT=mongodb # mongodb
   DB_USERNAME=
   DB_PASSWORD=
   DB_PORT=27017 # default port mongodb
   DB_DATABASE=exampleDB

   DB_MONGOD_URL=
   ```

   - Membuat model tabel/collection sesuai dengan referensi @Mongoose
   - [Documentation Mongoose](https://mongoosejs.com/docs/5.x/docs/guide.html)

## Running Services @ExpressJS

1. **Menjalankan Server @ExpressJS**:

   - Jalankan server lokal @ExpressJS untuk menjalankan Back-End:

   ```cmd
   npm run start
   ```
   ```cmd
   pnpm run start
   ```
