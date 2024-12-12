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
  const $query = `SELECT * FROM ${this.name}`;
  this.redisTempDatas = await $conn.query($query);
  console.log(`Save to temporary ${this.name}`);
 }

 async Create($datas) {
  return new Promise(async (resolve, reject) => {
   const $values = this.model.map((_, $key) => `$${++$key}`);
   const $query = `INSERT INTO ${this.name} (${this.model}) VALUES (${$values})`;

   await $conn
    .query($query, Object.values($datas))
    .then(($callback) => {
     const { rowCount } = $callback;
     if (!rowCount) {
      reject($err);
     } else {
      resolve(`Berhasil menyimpan data`);
     }
    })
    .catch(($err) => {
     reject($err);
    });
  });
 }

 async Find() {
  try {
   if (this.redisTempDatas.length) {
    return this.redisTempDatas;
   }

   const $query = `SELECT * FROM ${this.name}`;
   const callback = await $conn.query($query).then(($callback) => {
    const { rows } = $callback;
    if (rows.length) {
     return rows;
    } else {
     return `Tidak ada data tersimpan`;
    }
   });

   this.redisTempDatas = callback;

   return callback;
  } catch ($err) {
   return `Kesalahan mengambil data data ${$err}`;
  }
 }

 async FindById(id) {
  try {
   const $query = `SELECT * FROM ${this.name} WHERE id = ${id}`;
   if (this.redisTempDatas.length > 0) {
    let tmpDatas = this.redisTempDatas.filter((list) => list.id == id);

    return tmpDatas.length
     ? tmpDatas
     : await $conn.query($query).then(($callback) => {
        const { rows } = $callback;
        if (rows.length) {
         return rows;
        } else {
         return `Tidak ada data tersimpan`;
        }
       });
   }

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

 async FindByFilter(filter) {
  try {
   const $query = `SELECT ${this.model} FROM ${this.name} WHERE ${filter}`;
   console.log($query);

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

 async FindByIdAndUpdate(id, data) {
  try {
   const $keys = Object.keys(data);
   Object.values(data).forEach((list, index) => {
    $keys[index] += ` = '${list}'`;
   });

   const $query = `UPDATE ${this.name} SET ${$keys} WHERE ID = ${id}`;
   const callback = await $conn
    .query($query)
    .then(($callback) => {
     const { rowCount } = $callback;
     if (!rowCount) {
      return $callback;
     } else {
      return `Berhasil menyimpan data`;
     }
    })
    .catch(($err) => {
     return $err;
    });

   return callback;
  } catch ($err) {
   return `Kesalahan update data ${$err}`;
  }
 }

 async FindOneAndUpdate(req, data) {
  const filter = SetParams(req) ? SetParams(req) : SetRequest(req);
  return await this.model.findOneAndUpdate(filter, data).exec();
 }

 async FindByIdAndRemove(id) {
  try {
   const $query = `DELETE FROM ${this.name} WHERE ID = ${id}`;
   const callback = await $conn
    .query($query)
    .then(($callback) => {
     const { rowCount } = $callback;
     if (!rowCount) {
      return $callback;
     } else {
      return `Berhasil menghapus data`;
     }
    })
    .catch(($err) => {
     return $err;
    });

   return callback;
  } catch ($err) {
   return `Kesalahan delete data ${$err}`;
  }
 }

 async FindOneAndRemove(req) {
  const filter = SetParams(req) ? SetParams(req) : SetRequest(req);
  return await this.model.findOneAndRemove(filter).exec();
 }
}

module.exports = RepositoryService;
