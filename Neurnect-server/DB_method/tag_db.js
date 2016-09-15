//スキーマ定義
module.exports.dbtagdefine = function() {
  mongoose.connect('mongodb://localhost/Neurnect');
  var Schema = mongoose.Schema;

  var TagSchema = new Schema ({
    tag:    { type: String, required: true },
    color:  { type: String, enum: ['blue', 'red', 'yellow', 'black', 'green', 'purple'] }
  });
  var collection = "tag";
  this.mongoose.model('Tag', TagSchema, collection);
};

//ドキュメント生成
module.exports.dbtaginsert = function(tagobj) {
  var Tag = mongoose.model('Tag');
  var tag = new Tag(tagobj);
  tag.save(function(err) {
    if(err){ console.log(err); }
  });
};
