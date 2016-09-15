var posted_data = require('./posted_data.js');
var db_find = require('./dbfind.js');

var Database = function (mongoose) {
  // Property and Constructor
  this.mongoose = mongoose;
};

// Method
Database.prototype.setMongooseObject = function (mongoose) {
  this.mongoose = mongoose;
};

for(var property in posted_data){
  Database.prototype[property] = posted_data[property];
}

for(var property in db_find){
  Database.prototype[property] = db_find[property];
}

// exportsの指定
module.exports = Database;
