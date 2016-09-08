var mongoose = require('mongoose');

//スキーマ定義
var dbtagdefine = function() {
  mongoose.connect('mongodb://localhost/Neurnect');
  var Schema = mongoose.Schema;

  var TagSchema = new Schema ({
    tag:    { type: String, required: true },
    color:  { type: String, enum: ['blue', 'red', 'yellow', 'black', 'green', 'purple'] }
  });
  mongoose.model('Tag', TagSchema);
}

//ドキュメント生成
var dbtaginsert = function(tagobj) {
  var Tag = mongoose.model('Tag');
  var tag = new Tag();
  tag.tag = tagobj.tag;
  tag.color = tagobj.color;
  tag.save(function(err) {
    if(err){ console.log(error); }
  });
}
