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

var counter = 0;
var flag = 0;

dbmodule.dbdefine();
dbmodule.tagdefine();
dbmodule.themedefine();

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る

app.use(favicon(__dirname + '/views/image/favicon.ico'));

io.sockets.on("connection", function(socket){
  socket.on('init_upload', function(cate_name){
    //positonの抽出
    dbmodule.dbposition_x_max(function(position_x){
      var x_max = position_x;
      dbmodule.dbposition_y_max(function(position_y_max){
        var y_max = position_y_max;
        dbmodule.dbposition_y_min(function(position_y_min){
          var y_min = position_y_min;
          socket.emit("position_limit", {
            "x_max": x_max,
            "y_max": y_max,
            "y_min": y_min
          });
        });
      });
    });

    //初回ページの要求
    dbmodule.dbcate(cate_name.category, function(init_data){  //normalカテゴリを表示
      //DBへtagデータの受け渡しの要求
      dbmodule.tagall(function(init_tag){
        for(var i = 0; i < init_tag.length; i++){
          init_tag[i].color = color_settings.color_settings[init_tag[i].color];
        }
        // 初期join
        socket.join(cate_name.category);

        socket.emit("init_update", {
          "data": init_data,
          "tag": init_tag
        });
      });
    });
  });

  //カテゴリチャンネルへの参加
  socket.on("request_category", function(cate_name){
    dbmodule.dbcate(cate_name.category, function(cate_data){  //カテゴリデータの抽出
      dbmodule.tagall(function(cate_tag){ //DBへのTagデータの受け渡し要求
        for(var i = 0; i < cate_tag.length; i++){
          cate_tag[i].color = color_settings.color_settings[cate_tag[i].color];
        }
        socket.join(cate_name.category); //カテゴリチャンネルに参加
        socket.emit("response_category", {
          "data": cate_data,
          "tag": cate_tag
        });
      });
    });
  });

  //語るカテゴリのテーマ登録
  socket.on("conv_theme_request",function(conv_theme){

    conv_theme._id = counter;
    console.log(conv_theme._id);
    console.log(conv_theme.theme);
    dbmodule.themeinsert(conv_theme);
    if(flag == 0){
      setTimeout(() => {
        //テーマの削除・変更
        //  socket.on("theme_choose",function(){
        dbmodule.themecount(function(themecount){
          console.log("現在のテーマ総数 : " + themecount);
          var propcount = Math.floor(Math.random() * (themecount - 0) + 0);
          dbmodule.themefind(propcount, function(choose_theme){
            console.log(choose_theme);
            io.sockets.emit("conv_theme_response",{
              "theme": choose_theme.theme,
              "_id": choose_theme._id
            });
            dbmodule.themeremove();
          });
        });
        counter = 0;
        flag = 0;
  //    });
}, 15000);
    }
    counter++;
    flag++;
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

    var NowCategory = upload.data.category;
    if(NowCategory == "conversation"){
      socket.to(upload.category).emit("upload", {
        "data": upload.data
      });
    }
    else{
      socket.to(upload.category).emit("update", { //update.dataをフロントへ渡す
        "data": upload.data,
        "tag": update_tag
      });
    }
  });
});

SendFiles.send_Files(app);

server.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
