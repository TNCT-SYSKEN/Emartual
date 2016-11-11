//スキーマ定義
module.exports.dbdefine = function() {
  var Schema = this.mongoose.Schema;

  var Posted_dataSchema = new Schema ({
    text:   { type: String, required: true },
    form:   { type: String, enum: ['ellipse', 'rect', 'unique'], default: "ellipse" },
    image:  { type: String },
    position:    { x: { type: Number, required: true }, y: { type: Number, required: true } },
    category:   { type: String, enum: ['normal', 'conversation'], default: "normal" },
    tag:    { type: String, required: true },
    like:   { type: Number, default: 0 },
    link:   { type: String },
    date:   { type: Date, default: Date.now }
  });
  var collection = "Posted_data";
  this.mongoose.model('Posted_data', Posted_dataSchema, collection);
};

//ドキュメント生成
module.exports.dbinsert = function(dbobj) {
  var Posted_data = this.mongoose.model('Posted_data');
  var posted_data = new Posted_data(dbobj);
  
  posted_data.save(function(err) {
    if(err){ console.log(err); }
  });
};
