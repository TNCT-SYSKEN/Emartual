//スキーマ定義
module.exports.dbdefine = function() {
  mongoose.connect('mongodb://localhost/Neurnect');
  var Schema = mongoose.Schema;

  var PostedSchema = new Schema ({
    text:   { type: String },
    form:   { type: String, enum: ['ellipse', 'rect', 'unique'] },
    image:  { type: String },
    position:    { x: Number, y: Number, required: true },
    cate:   { type: String, enum: ['normal', 'sports'] },
    tag:    { type: String, required: true },
    like:   { type: Number, default: 0 },
    link:   { type: String },
    date:   { type: Date, default: Date.now }
  });
  mongoose.model('Posted', PostedSchema);
};

//ドキュメント生成
module.exports.dbinsert = function(dbobj) {
  var Posted = mongoose.model('Posted');
  var posted = new Posted();
  posted.text = dbobj.text;
  posted.form = dbobj.form;
  posted.image = dbobj.image;
  posted.position = dbobj.position;
  posted.cate = dbobj.cate;
  posted.tag = dbobj.tag;
  posted.like = dbobj.like;
  posted.link = dbobj.link;
  posted.date = dbobj.date;
  posted.save(function(err) {
    if(err){ console.log(err); }
  });
};
