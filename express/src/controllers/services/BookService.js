const Bcrypt = require("bcrypt");
const Validator = require("../../tools/Validator.js");
const RepositorySQL = require("../../apps/database/RepositorySQL.js");
const Book = require("../../apps/models/BookModel.js");

const { GetDataFormat } = new Book();
const { IsSet, SetRequest, SetParams, IsValidRequest, SetObject } = new Validator();

const $checkingBooks = async (req, repoData) => {
 const { id, title, isForceUpdate } = SetRequest(req) ? SetRequest(req) : SetParams(req);

 let isDataUsed = repoData.filter((list) => list.title == title);
 isDataUsed = !isDataUsed.length && id ? repoData.filter((list) => list.id == id) : isDataUsed;

 if (!isDataUsed.length) return false;
 if (isDataUsed.length && isForceUpdate) return false;
 return true;
};

const $getDataByID = async (req, repo) => {
 return new Promise(async (resolve, reject) => {
  const { id } = SetParams(req) ? SetParams(req) : SetRequest(req);

  if (!IsSet(id)) {
   return reject(`Format tidak sesuai atau input value kosong!`);
  }

  return await repo
   .FindById(id)
   .then((result) => resolve(result))
   .catch((err) => reject(err));
 });
};

const $getDataByFilter = async (req, repo) => {
 return new Promise(async (resolve, reject) => {
  let qryFilter = ``;
  const filter = SetParams(req) ? SetParams(req) : SetRequest(req);

  const validQuery = ["id", "title", "page", "document"];
  if (!IsValidRequest(validQuery, filter).length) {
   return reject(`Terdapat properti query filter yang tidak sesuai`);
  }

  const $keys = Object.keys(filter);
  Object.values(filter).forEach((list, index) => {
   $keys[index] += ` = '${list}'`;
  });

  $keys.forEach((list, index) => {
   if (index !== 0) {
    qryFilter += ` AND ${list} `;
   } else {
    qryFilter += ` ${list} `;
   }
  });

  return await repo
   .FindByFilter(qryFilter)
   .then((result) => resolve(result))
   .catch((err) => reject(err));
 });
};

class UserService {
 constructor() {
  this._Repository = new RepositorySQL(["title", "price", "description"], "books");
 }

 GetName() {
  return this._Repository.GetName();
 }

 async SetTempSavesDatas() {
  await this._Repository.SetTempSavesDatas();
 }

 async CreateData(req, res) {
  return new Promise(async (resolve, reject) => {
   const { title, price, description } = SetRequest(req);

   if (!IsSet(title)) {
    return reject([`Format tidak sesuai atau input value kosong!`, GetDataFormat()]);
   }

   const newData = new Book(title, price, description);

   await this._Repository
    .Create(newData)
    .then((callback) => resolve(`${callback}`))
    .catch((err) => reject(err));
  });
 }

 async GetDatas(req, res) {
  return new Promise(async (resolve, reject) => {
   await this._Repository
    .Find()
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
 }

 async GetDataByID(req, res) {
  return new Promise(async (resolve, reject) => {
   await $getDataByID(req, this._Repository)
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
 }

 async GetDataByFilter(req, res) {
  return new Promise(async (resolve, reject) => {
   await $getDataByFilter(req, this._Repository)
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
 }

 async UpdateDataByID(req, res) {
  return new Promise(async (resolve, reject) => {
   const datas = await $getDataByID(req, this._Repository);
   console.log(datas);
   

   if (typeof datas === "string") {
    return reject(`${datas}`);
   }

   const { title, price, description } = SetRequest(req);
   if (!IsSet(title)) {
    return reject([`Format tidak sesuai atau input value kosong!`, GetDataFormat()]);
   }

   const newData = new Book(title, price, description);

   return await this._Repository
    .FindByIdAndUpdate(datas[0].id, newData)
    .then(($callback) => {
     const { name } = $callback;

     if (name === "error") {
      resolve($callback);
     } else {
      resolve(`Berhasil mengubah data`);
     }
    })
    .catch((err) => reject(err));
  });
 }

 async UpdateDataByFilter(req, res) {
  return new Promise(async (resolve, reject) => {
   const isDataInDB = await $getDataByFilter(req, this._Repository);

   if (typeof isDataInDB === "string") {
    return reject(isDataInDB);
   }

   const { name, level, description } = SetRequest(req);

   if (!IsSet(name) || !IsSet(level)) {
    return reject([`Format tidak sesuai atau input value kosong!`, GetDataFormat]);
   }

   const roleDatas = await this._Repository.GetTempDatas();
   if (await $checkingBooks(req, roleDatas)) {
    return reject(`Nama atau Level Role sudah terpakai`);
   }

   const newData = new Role(name, level, description);

   return await this._Repository
    .FindOneAndUpdate(req, newData)
    .then((_) => resolve(`Berhasil mengubah data`))
    .catch((err) => reject(err));
  });
 }

 async DeleteDataByID(req, res) {
  return new Promise(async (resolve, reject) => {
   const datas = await $getDataByID(req, this._Repository);
   console.log(datas);

   if (typeof datas === "string") {
    return reject(datas);
   }

   return await this._Repository
    .FindByIdAndRemove(datas[0].id)
    .then(($callback) => {
     const { name } = $callback;

     if (name === "error") {
      resolve($callback);
     } else {
      resolve(`Berhasil menghapus data`);
     }
    })
    .catch((err) => reject(err));
  });
 }

 async DeleteDataByFilter(req, res) {
  return new Promise(async (resolve, reject) => {
   const isDataInDB = await $getDataByFilter(req, this._Repository);

   if (typeof isDataInDB === "string") {
    return reject(isDataInDB);
   }

   const roleDatas = await this._Repository.GetTempDatas();
   if (!(await $checkingBooks(req, roleDatas))) {
    return reject(`Nama dan Level Role tersebut tidak terdaftar.`);
   }

   return await this._Repository
    .FindOneAndRemove(req)
    .then((_) => resolve(`Berhasil menghapus data`))
    .catch((err) => reject(err));
  });
 }
}

module.exports = UserService;
