var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    favicon = require('serve-favicon');
var ejs = require('ejs');
var mongoose = require('mongoose');

var setting = require("./setting.js");
var mainUI = require("./mainUI.js");
var DBModule = require("./DB_method/dbmodule.js");
var SendFiles = require("./SendFiles.js");
var color_settings = require("./color_settings.js")

var dbmodule = new DBModule(mongoose);
var color_code;

dbmodule.dbdefine();
dbmodule.tagdefine();

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る

app.use(favicon(__dirname + '/views/image/favicon.ico'));

io.sockets.on("connection", function(socket){
  //初回ページの要求
  dbmodule.dball(function(init_data){
    io.sockets.emit("init_data", init_data);
  });

  //DBへtagデータの受け渡しの要求
  dbmodule.tagall(function(init_tag){
    io.sockets.emit("init_tag", init_tag);
    var propcount = Math.floor(Math.random() * (6 - 0) + 0);
    var count = 0;
    for (var result in color_settings.color_settings){
      if (propcount == count){
        dbmodule.taginsert(result);
        color_code = result;
        break;
      }
      count++;
    }
  });

  socket.on('upload_tag', function(upload_tag){
    var docs_color =  color_settings.color_settings[color_code];
    dbmodule.taginsert({
      "tag": upload_tag,
      "color": docs_color
    });
    io.sockets.emit("update_tag", upload_tag);
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
