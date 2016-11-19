//スキーマ定義
module.exports.themedefine = function(){
  var Schema = this.mongoose.Schema;

  var ThemeSchema = new Schema ({
    _id:   { type: Number, required: true },
    theme: { type: String, required: true }
  });
  var collection = "Theme_data";
  this.mongoose.model('Theme', ThemeSchema, collection);
};

//ドキュメント生成
module.exports.themeinsert = function(themeobj){
  var Theme = this.mongoose.model('Theme');
  var theme = new Theme(themeobj);

  theme.save(function(err){
    if(err){ console.log(err); }
  });
};

//themeコレクションのIDで指定して抽出
module.exports.themefind = function(id, callback) {
  var Theme = this.mongoose.model('Theme');
  Theme.find({ _id: id }, function(err, docs){
    if(err){ console.log(err); }

    callback(docs[0]);
  }).select('theme').limit(1);
};

//themeコレクション内のドキュメント数を検索
module.exports.themecount = function(callback){
  var Theme = this.mongoose.model('Theme');
  Theme.count({}, function(err, count){
    if(err){ console.log(err); }

    callback(count);
  });
};

//themeコレクション内のドキュメントを全削除
module.exports.themeremove = function(){
  var Theme_data = this.mongoose.model('Theme_data');

  Theme_data.remove({}, function(err){
    if(err){ console.log(err); }
  });
};
