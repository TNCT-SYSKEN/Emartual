var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
var ejs = require('ejs');
var mongoose = require('mongoose');

var setting = require("./setting.js");
var mainUI = require("./mainUI.js");
var DBModule = require("./DB_method/dbmodule.js");


var dbmodule = new DBModule(mongoose);
dbmodule.dbdefine();

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る


io.sockets.on("connection", function(socket){
  dbmodule.dball(function(docs){
      io.sockets.emit("init_data", docs);
  });
});



app.get('/js/app.js', function(req, res){
  res.sendFile(__dirname + "/views/js/app.js");
});

app.get('/css/app.css', function(req, res){
  res.sendFile(__dirname + "/views/css/app.css");
});

server.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
