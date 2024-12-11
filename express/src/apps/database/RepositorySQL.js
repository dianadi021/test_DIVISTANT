const { $conn } = require("../../apps/database/Connect.js");

const Validator = require("../../tools/Validator");
const { SetRequest, SetParams } = new Validator();

class RepositoryService {
 constructor(model, name) {
  this.model = model;
  this.name = name;
  this.redisTempDatas = [];
 }

 GetName() {
  return this.name;
 }

 GetTempDatas() {
  return this.redisTempDatas;
 }

 async SetTempSavesDatas() {
  setTimeout(async () => {
   this.redisTempDatas = await this.model.find().exec();
  }, 1000);
  console.log(`Save to temporary ${this.name}`);
 }

 async Create($datas) {
  try {
   const $values = this.model.map((_, $key) => `$${++$key}`);

   const $query = `INSERT INTO ${this.name} (${this.model}) VALUES (${$values})`;
   const callback = await $conn.query($query, Object.values($datas)).then(($callback) => {
    const { rowCount } = $callback;
    if (!rowCount) {
     return $callback;
    } else {
     return `Berhasil menyimpan data`;
    }
   });

   return callback;
  } catch ($err) {
   return `Kesalahan insert data ${$err}`;
  }
 }

 async Find() {
  try {
   const $query = `SELECT ${this.model} FROM ${this.name}`;
   const callback = await $conn.query($query).then(($callback) => {
    const { rows } = $callback;
    if (rows.length) {
     return rows;
    } else {
     return `Tidak ada data tersimpan`;
    }
   });

   return callback;
  } catch ($err) {
   return `Kesalahan mengambil data data ${$err}`;
  }
 }

 async FindById(id) {
  return this.redisTempDatas.length ? this.redisTempDatas.filter((list) => list._id == id) : await this.model.findById(id).exec();
 }

 async FindByFilter(filter) {
  const { page, document } = filter;

  if (page && document) {
   return await this.model.aggregate([{ $match: filter }, { $skip: (parseInt(page) - 1) * parseInt(document) }, { $limit: parseInt(document) }]);
  }

  return await this.model.findOne(filter).exec();
 }

 async FindByIdAndUpdate(id, data) {
  return await this.model.findByIdAndUpdate(id, data).exec();
 }

 async FindOneAndUpdate(req, data) {
  const filter = SetParams(req) ? SetParams(req) : SetRequest(req);
  return await this.model.findOneAndUpdate(filter, data).exec();
 }

 async FindByIdAndRemove(id) {
  return await this.model.findByIdAndRemove(id).exec();
 }

 async FindOneAndRemove(req) {
  const filter = SetParams(req) ? SetParams(req) : SetRequest(req);
  return await this.model.findOneAndRemove(filter).exec();
 }
}

module.exports = RepositoryService;
