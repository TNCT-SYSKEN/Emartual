// require文
var mongoose = require('mongoose');
var posted_data = require('./DB_method/posted_data.js');
var db_find = require('./DB_method/dbfind.js');
var fs = require('fs');

// 引数用
var tag = "hoge";
var category = "fuga";

// MEMO: ここでmongooseを渡す
// MEMO: 理由: mongoose.modelプロパティを保存してやりたいから
// MEMO: JavaScriptの規約上オブジェクトは参照渡しされるためmongooseをreturnする必要がない
posted_data.dbdefine(mongoose);

var prepost_data = [
  {
    text: "Hello, Neurnect",
    form: "ellipse",
    position: {x: 50, y: 50},
    cate: "normal",
    tag: "hoge",
  },
  {
    text: "Neurnectの世界へようこそ",
    form: "rect",
    position: {x: 200, y: 200},
    cate: "normal",
    tag: "hoge",
  }];

// MEMO: データinsert用
// MEMO: 非同期のため単体で一度だけ動作させること
/*
for(var i = 0; i < prepost_data.length; i++){
  posted_data.dbinsert(mongoose, prepost_data[i]);
}
*/

// 全件全要素抽出テスト
db_find.dball(mongoose, function(result){
  // 結果表示
  console.log(result);

  // 結果記録
  // MEMO: result.jsonはgitステージングしないよう注意
  fs.writeFile('result.json', result, function(err){
    if(err){
      console.log(err);
    }
  });
});
