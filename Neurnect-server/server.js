var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    favicon = require('serve-favicon');
var ejs = require('ejs');
var mongoose = require('mongoose');
var async = require('async');

var setting = require("./setting.js");
var mainUI = require("./mainUI.js");
var DBModule = require("./DB_method/dbmodule.js");
var SendFiles = require("./SendFiles.js");
var color_settings = require("./color_settings.js");

var dbmodule = new DBModule(mongoose);

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
          if(cate_name.category != 'conversation'){
            cate_tag[i].color = color_settings.color_settings[cate_tag[i].color];
          }
          else{
            cate_tag[i].tag = null;
            cate_tag[i].color = null;
          }
        }
        dbmodule.themefind(0, function(find_theme){
          socket.join(cate_name.category); //カテゴリチャンネルに参加
          if(cate_name.category == 'conversation'){
            socket.emit("response_category", {
              "data": cate_data,
              "tag": cate_tag,
              "theme": find_theme.theme
            });
          }
          else if(cate_name.category == 'normal'){
            socket.emit("response_category", {
              "data": cate_data,
              "tag": cate_tag,
            });
          }
        });
      });
    });
  });

  //語るカテゴリのテーマ登録
  socket.on("conv_theme_request",function(conv_theme){
    dbmodule.themecount(function(count){
      conv_theme._id = count; //counter数を投稿されたテーマのidとする
      dbmodule.themeinsert(conv_theme); //DBにテーマを登録
    });
  });

  //テーマの削除・変更
  socket.on("theme_choose",function(){
    dbmodule.themecount(function(themecount){
      var propcount = Math.floor(Math.random() * (themecount - 0) + 0); //投稿の総数を上限として数値を一つランダムで選ぶ
      //語るカテゴリにテーマが投稿されていればランダムに1つ抽出しsocketを送る
        dbmodule.themefind(propcount, function(choose_theme){
          io.sockets.emit("conv_theme_response",{
            "theme": choose_theme.theme
          });
          async.waterfall([
            function(callback){
              callback(null, 'one', 'two');
            },
            function(arg1, arg2, callback){ //先に全件削除を行う
              dbmodule.themeremove();
              callback(null, 'three');
            },
            function(arg1, callback){ //その後に_idを0にして追加
              choose_theme._id = 0; // 初期値0を投稿されたテーマのidとする
              callback(null, 'four');
            },
            function(arg1, callback){
              dbmodule.themeinsert({
                "theme": choose_theme.theme,
                "_id": choose_theme._id
              });

              // Posted_dataコレクションからconversationドキュメントを全削除
              var CONVERSATION = "conversation";
              dbmodule.dbcateremove(CONVERSATION);
              callback(null, 'done');
            }
          ]);
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
    else if(upload.data.category == 'normal'){
      dbmodule.tagfindone(update_tag.tag, function(doc){
        update_tag.color = doc.color;
      });
    }

    //upload.dataをDBに渡す
    dbmodule.dbinsert(upload.data);

    if(upload.data.category == "normal"){
      update_tag.color = color_settings.color_settings[update_tag.color];

      io.sockets.in(upload.data.category).emit("update", { //update.dataをフロントへ渡す
        "data": upload.data,
        "tag": update_tag
      });
    }
    else{
      io.sockets.in(upload.data.category).emit("update", {
        "data": upload.data
      });
    }
  });
});

SendFiles.send_Files(app);

server.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
