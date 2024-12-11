const Bcrypt = require("bcrypt");
const Validator = require("../../../tools/Validator.js");
const RepositorySQL = require("../../../apps/database/RepositorySQL.js");
const User = require("../../../apps/models/users/UserModel.js");

const { GetDataFormat } = new User();
const { IsSet, SetRequest, SetParams, IsValidRequest, SetObject } = new Validator();

const $checkingUsers = async (req, repoData) => {
 const { id, name, level, isForceUpdate } = SetRequest(req) ? SetRequest(req) : SetParams(req);

 let isDataUsed = repoData.filter((list) => list.name == name);
 isDataUsed = !isDataUsed.length && level ? repoData.filter((list) => list.level == level) : isDataUsed;
 isDataUsed = !isDataUsed.length && id ? repoData.filter((list) => list._id == id) : isDataUsed;

 if (!isDataUsed.length) return false;
 if (isDataUsed.length && isForceUpdate) return false;
 return true;
};

const $getDataByID = async (req, repo) => {
 return new Promise(async (resolve, reject) => {
  const { id } = SetParams(req);

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
  const validQuery = ["name", "level", "page", "document"];
  const filter = SetParams(req) ? SetParams(req) : SetRequest(req);

  if (!IsValidRequest(validQuery, filter).length) {
   return reject(`Terdapat properti query filter yang tidak sesuai`);
  }

  return await repo
   .FindByFilter(filter)
   .then((result) => resolve(result))
   .catch((err) => reject(err));
 });
};

class UserService {
 constructor() {
  this._Repository = new RepositorySQL(["username", "email", "password"], "users");
 }

 GetName() {
  return this._Repository.GetName();
 }

 async SetTempSavesDatas() {
  await this._Repository.SetTempSavesDatas();
 }

 async CreateData(req, res) {
  return new Promise(async (resolve, reject) => {
   const { username, email, password } = SetRequest(req);

   if (!IsSet(username) || !IsSet(email) || !IsSet(password)) {
    return reject([`Format tidak sesuai atau input value kosong!`, GetDataFormat()]);
   }

   const tmpPass = await Bcrypt.hash(password, 12);
   const newData = new User(username, email, tmpPass);

   await this._Repository
    .Create(newData)
    .then((callback) => resolve(`${callback}`))
    .catch((err) => reject(err));
  });
 }

 async GetDatas(req, res) {
  return new Promise(async (resolve, reject) => {
   return await this._Repository
    .Find()
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
 }

 async GetDataByID(req, res) {
  return new Promise(async (resolve, reject) => {
   return await $getDataByID(req, this._Repository)
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
 }

 async GetDataByFilter(req, res) {
  return new Promise(async (resolve, reject) => {
   return await $getDataByFilter(req, this._Repository)
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
 }

 async UpdateDataByID(req, res) {
  return new Promise(async (resolve, reject) => {
   const { id } = SetParams(req);

   if (!IsSet(id)) {
    return reject([`ID kosong.`]);
   }

   if (!(await $getDataByID(req, this._Repository))) {
    return reject(`Tidak ada role dengan ID tersebut!`);
   }

   const { name, level, description } = SetRequest(req);

   if (!IsSet(name) || !IsSet(level)) {
    return reject([`Format tidak sesuai atau input value kosong!`, GetDataFormat]);
   }

   const roleDatas = await this._Repository.GetTempDatas();
   if (await $checkingUsers(req, roleDatas)) {
    return reject(`Nama atau Level Role sudah terpakai`);
   }

   const newData = new Role(name, level, description);

   return await this._Repository
    .FindByIdAndUpdate(id, newData)
    .then((_) => resolve(`Berhasil mengubah data`))
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
   if (await $checkingUsers(req, roleDatas)) {
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
   const { id } = SetParams(req);

   if (!IsSet(id)) {
    return reject([`ID kosong.`]);
   }

   const roleDatas = await this._Repository.GetTempDatas();
   if (!(await $checkingUsers({ id }, roleDatas))) {
    return reject(`Tidak ada role dengan ID tersebut!`);
   }

   return await this._Repository
    .FindByIdAndRemove(id)
    .then((_) => resolve(`Berhasil menghapus data`))
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
   if (!(await $checkingUsers(req, roleDatas))) {
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
