var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
var ejs = require('ejs');
var mongoose = require('mongoose');

var setting = require("./setting.js");
var mainUI = require("./mainUI.js");
var DBModule = require("./DB_method/dbmodule.js");
var SVModule = require("./svmodule.js");

var flag = 0; //初回ページを表示するか判別用の変数

var dbmodule = new DBModule(mongoose);

dbmodule.dbdefine();

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る

io.sockets.on("connection", function(socket){
  console.log("-------------------------------------------");
  //初回ページの要求
  if(flag != 1){
    dbmodule.dball(function(init_data){
      io.sockets.emit("init_data", init_data);
      console.log("init_data:");
      console.log(init_data);
      console.log("");
    });
  }
  socket.on('upload_data', function(upload_data){
    console.log("upload_data:");
    console.log(upload_data);
    console.log("");
    dbmodule.dbinsert(function(upload_data){
      console.log("upload_data:");
      console.log(upload_data);
      console.log("");
    });
    flag = 1;

    dbmodule.dball(function(update_data){
      io.sockets.emit("update_data", update_data);
      console.log("update_data:");
      console.log(update_data);
    });
  });
});

SVModule.send_Files(app);

server.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
