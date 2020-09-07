// 操作数据库

var MongoClient = require('mongodb').MongoClient;
var Config = require('./config.js');

class Mongodb {
  constructor() {
    this.dbClient = ''; // 属性 放db对象
    this.connect(); // 实例化的时候就连接数据库
  }

  // 单例  多次实例化实例不共享的问题
  static getInstance() {
    if (!Mongodb.instance) {
      Mongodb.instance = new Mongodb();
    }
    return Mongodb.instance;
  }

  // 连接数据库
  connect() {
    let _that = this;
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) { // 解决数据库多次连接的问题
        MongoClient.connect(Config.dbUrl, (err, client) => {
          if (err) {
            reject(err)
          } else {
            _that.dbClient = client.db(Config.dbName);
            resolve(_that.dbClient)
          }
        })

      } else {
        resolve(_that.dbClient);
      }
    })
  }

  // 查找数据
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        var result = db.collection(collectionName).find(json);
        result.toArray(function (err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        })
      })
    })
  }
  update(collectionName, json) {
    // .....
  }
  insert(data, collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection('user').insertOne(data, function (err, result) {
          if (!err) {
            console.log('添加数据成功');
            resolve(true);
          }
        })
      })
    })
  }
}

module.exports = new Mongodb()