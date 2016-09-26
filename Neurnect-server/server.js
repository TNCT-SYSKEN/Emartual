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
var color_settings = require("./color_settings.js");

var dbmodule = new DBModule(mongoose);

dbmodule.dbdefine();
dbmodule.tagdefine();

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る

app.use(favicon(__dirname + '/views/image/favicon.ico'));

io.sockets.on("connection", function(socket){
  //初回ページの要求
  dbmodule.dball(function(init_data){
    //DBへtagデータの受け渡しの要求
    dbmodule.tagall(function(init_tag){
      for(var i = 0; i < init_tag.length; i++){
        init_tag[i].color = color_settings.color_settings[init_tag[i].color];
      }
      io.sockets.emit("init", {
        "data": init_data,
        "tag": init_tag
      });
    });
  });

  //positonの抽出
  dbmodule.dbposition_x_max(function(position_x){
    var x_max = position_x;

    dbmodule.dbposition_y_max(function(position_y_max){
      var y_max = position_y_max;

      dbmodule.dbposition_y_min(function(position_y_min){
        var y_min = position_y_min;

        io.sockets.emit("position_limit", {
          "x_max": x_max,
          "y_max": y_max,
          "y_min": y_min
        });
      });
    });
  });

  //tag情報の受け渡し
  socket.on('upload_tag', function(upload_tag){
    var propcount = Math.floor(Math.random() * (6 - 0) + 0);
    var count = 0;
    var update_tag = null;
    for (var result in color_settings.color_settings){
      if (propcount == count){
        upload_tag.color = result;
        break;
      }
      count++;
    }
    dbmodule.taginsert(upload_tag);
    update_tag.tag = upload_tag.tag;
    update_tag.color = color_settings.color_settings[upload_tag.color];
    io.sockets.emit("update_tag", update_tag);
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
