var color_settings = require('../color_settings.js');

//スキーマ定義
module.exports.tagdefine = function() {
  var Schema = this.mongoose.Schema;

  var TagSchema = new Schema ({
    tag:    { type: String, required: true, unique: true },
    color:  { type: String, enum: ['blue', 'red', 'yellow', 'black', 'green', 'purple'] }
  });
  var collection = "Tag_data";
  this.mongoose.model('Tag', TagSchema, collection);
};

//ドキュメント生成
module.exports.taginsert = function(tagobj) {
  var Tag = this.mongoose.model('Tag');
  var tag = new Tag(tagobj);

  tag.save(function(err) {
    if(err){ console.log(err); }
  });
};

//全件抽出
module.exports.tagall = function(callback) {
  var Tag = this.mongoose.model('Tag');
  Tag.find({}, function(err, docs) {
    if(err){ console.log(err); }

    // callbackの起動
    callback(docs);
  });
};
