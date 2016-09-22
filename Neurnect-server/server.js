var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
var ejs = require('ejs');
var mongoose = require('mongoose');

var setting = require("./setting.js");
var mainUI = require("./mainUI.js");
var DBModule = require("./DB_method/dbmodule.js");
var SendFiles = require("./SendFiles.js");

var dbmodule = new DBModule(mongoose);

dbmodule.dbdefine();

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る

io.sockets.on("connection", function(socket){
  //初回ページの要求
  dbmodule.dball(function(init_data){
    io.sockets.emit("init_data", init_data);
  });

  socket.on('upload_data', function(upload_data){
    dbmodule.dbinsert(upload_data);
    io.sockets.emit("update_data", upload_data);
  });
});

SendFiles.send_Files(app);

server.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
