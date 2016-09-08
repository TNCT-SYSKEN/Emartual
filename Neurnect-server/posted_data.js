var mongoose = require('mongoose');

//スキーマ定義
var dbdefine = function() {
  mongoose.connect('mongodb://localhost/Neurnect');
  var Schema = mongoose.Schema;

  var PostedSchema = new Schema ({
    text:   { type: String },
    form:   { type: String, enum: ['circle', 'square', 'unique'] },
    image:  { type: String },
    pos:    { type: [Number], default: [0,0], required: true },
    cate:   { type: String, enum: ['normal', 'sports'] },
    tag:    { type: String, required: true },
    like:   { type: Number, default: 0 },
    link:   { type: String },
    date:   { type: Date, default: Date.now }
  });
  mongoose.model('Posted',PostedSchema);
}

//ドキュメント生成
var dbinsert = function(dbobj) {
  var Posted = mongoose.model('Posted');
  var posted = new Posted();
  posted.text = dbobj.text;
  posted.form = dbobj.form;
  posted.image = dbobj.image;
  posted.pos = dbobj.pos;
  posted.cate = dbobj.cate;
  posted.tag = dbobj.tag;
  posted.like = dbobj.like;
  posted.link = dbobj.link;
  posted.date = dbobj.date;
    user.save(function(err) {
      if(err){ console.log(err); }
    });
}
