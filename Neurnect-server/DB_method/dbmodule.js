var posted_data = require('./posted_data.js');
var db_find = require('./dbfind.js');
var tag_db = require('./tag_db.js');
var reset_db = require('./reset_database.js');
var theme_db = require('./theme_db.js');

var Database = function (mongoose) {
  // Property and Constructor
  this.mongoose = mongoose;
  this.mongoose.connect('mongodb://localhost/Neurnect');
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

for(var property in tag_db){
  Database.prototype[property] = tag_db[property];
}

for(var property in reset_db){
  Database.prototype[property] = reset_db[property];
}

for(var property in theme_db){
  Database.prototype[property] = theme_db[property];
}

// exportsの指定
module.exports = Database;
