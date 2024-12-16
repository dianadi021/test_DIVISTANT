# Intros

Repos ini dibuat sebagai salah satu syarat teknikal tes dari tim DIVISTANT yang menggunakan database SQL. Dikarenakan menggunakan database SQL, disini saya menggunakan laravel untuk mempermudah proses migrasi table dan relasi antar table.

# Requirements
## Back-End Laravel 11 (Migration Only)
> [<img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" />![version](https://img.shields.io/badge/version-8.2.12-blue)](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe/download) </br>
> [<img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />![version](https://img.shields.io/badge/version-11.xx-blue)](https://laravel.com/docs/11.x/installation) </br>

## Back-End ExpressJS
> [<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />![version](https://img.shields.io/badge/version-21.7.1-blue)](https://nodejs.org/en/download) </br> 
> [<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />![version](https://img.shields.io/badge/version-4.19.2-blue)](https://expressjs.com/en/starter/installing.html) </br>

## Frontend VueJS3
> [<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />![version](https://img.shields.io/badge/version-21.7.1-blue)](https://nodejs.org/en/download/prebuilt-installer) </br>
> [<img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" />![version](https://img.shields.io/badge/version-3.5.13-blue)](https://vuejs.org/guide/quick-start.html) </br>
> [<img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white" />![version](https://img.shields.io/badge/version-3.7.1-blue)](https://cdnjs.com/libraries/jquery) </br>
> [<img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white" />![version](https://img.shields.io/badge/version-6.5.2-blue)](https://cdnjs.com/libraries/font-awesome) </br>
> [<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />![version](https://img.shields.io/badge/version-1.7-blue)](https://tailwindcss.com/docs/guides/vite#vue) </br>

### Tools
> [![HeadlessUI]](https://headlessui.com/v1/vue/menu#installation) </br>
> [![AXIOS]](https://axios-http.com/docs/intro) </br>
> [![AlpineJS]](https://alpinejs.dev/essentials/installation) </br>
> [![JQuery UI]](https://jqueryui.com) </br>
> [![MomentJS]](https://momentjs.com) </br>
> [![NotyJS]](https://www.jsdelivr.com/package/npm/noty) </br>
> [![Sweetalert]](https://sweetalert2.github.io) </br>
> [![tostr]](https://www.jsdelivr.com/package/npm/toastr) </br>
> [![DataTables]](https://datatables.net/download/) </br>

# Settings / Setup / Installation
1. **NodeJS Version**
   - [![nvm]](https://github.com/nvm-sh/nvm) `Windows` </br>
   ```cmd
   nvm install 21.7.1
   ```
   ```cmd
   nvm use 21.7.1
   ```
   ```cmd
   npm i -g pnpm
   ```

2. **@Laravel 11 (Migration Only)**
   - Migrasi database menggunakan laravel
   - Sesuaikan `.env` dengan server yang ingin digunakan
   ```cmd
   cd laravel
   ```
   ```cmd
   composer i
   ```
   - Jika tidak ada error, seharusnya table sudah termigrasi, jika belum maka bisa run
   ```cmd
   php artisan migrate
   ```
   - Jika masih error, pastika `key` pada `.env` sudah terisi atau belum, jika belum maka bisa run
   ```cmd
   php artisan key:generate
   ```

3. **@ExpressJS (Backend)**:
   ```cmd
   cd express
   ```
   ```cmd
   pnpm i
   ```
   - Sesuaikan `.env` dengan server yang ingin digunakan

4. **@VueJS3 (Frontend)**:
   ```cmd
   cd vuejs
   ```
   ```cmd
   pnpm i
   ```

# Running Development
1. **@ExpressJS**
```cmd
cd express
```
```cmd
pnpm dev
```

2. **@VueJS3**
```cmd
cd vuejs
```
```cmd
pnpm dev
```