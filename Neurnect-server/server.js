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
  dbmodule.dbcate("cate_name", function(init_data){  //normalカテゴリを表示
    //DBへtagデータの受け渡しの要求
    dbmodule.tagall(function(init_tag){
      for(var i = 0; i < init_tag.length; i++){
        init_tag[i].color = color_settings.color_settings[init_tag[i].color];
      }
      socket./*broadcast.to().*/emit("init", {
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

  //カテゴリチャンネルへの参加
  socket.on("request_category",function(cate_name){
    socket.join(cate_name); //カテゴリチャンネルに参加
    dbmodule.dbcate(cate_name,function(cate_data){  //カテゴリデータの抽出
      dbmodule.tagall(function(cate_tag){ //DBへのTagデータの受け渡し要求
        for(var i = 0; i < cate_tag.length; i++){
          cate_tag[i].color = color_settings.color_settings[cate_tag[i].color];
        }
        socket.to(cate_data).emit("response_category",{
          "data": cate_data,
          "tag": cate_tag
        });
      });
    });



    //tag情報の受け渡し
    socket.on('upload', function(upload){
      var propcount = Math.floor(Math.random() * (6 - 0) + 0);
      var count = 0;
      var update_tag = {};
      update_tag.tag = upload.data.tag;

      //新しいタグが投稿されたら
      if(upload.isnewtag){
        for (var result in color_settings.color_settings){
          if (propcount == count){
            update_tag.color = result;
            break;
          }
          count++;
        }
        dbmodule.taginsert({
          "tag": update_tag.tag,
          "color": update_tag.color
        });
      }
      else{
        dbmodule.tagfindone(update_tag.tag, function(doc){
          update_tag.color = doc.color;
        });
      }

      update_tag.color = color_settings.color_settings[update_tag.color];
      //upload.dataをDBに渡す
      dbmodule.dbinsert(upload.data);
      socket.to(cate_name).emit("update", { //update.dataをフロントへ渡す
        "data": upload.data,
        "tag": update_tag
      });
    });
  });
});

SendFiles.send_Files(app);

server.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
