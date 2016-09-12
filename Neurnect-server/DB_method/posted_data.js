//スキーマ定義
module.exports.dbdefine = function(mongoose) {
  mongoose.connect('mongodb://localhost/Neurnect');
  var Schema = mongoose.Schema;

  var PostedSchema = new Schema ({
    text:   { type: String },
    form:   { type: String, enum: ['ellipse', 'rect', 'unique'] },
    image:  { type: String },
    position:    { x: { type: Number, required: true }, y: { type: Number, required: true } },
    // MEMO: 仮にプロパティ名をcategoryに変更しているので何とかしてください
    category:   { type: String, enum: ['normal', 'sports'] },
    tag:    { type: String, required: true },
    like:   { type: Number, default: 0 },
    link:   { type: String },
    date:   { type: Date, default: Date.now }
  });
  // MEMO: モデル名, コレクション名を変更していないので何とかしてください(Mongoose doc(下記URL)を参照のこと)
  // MEMO: http://mongoosejs.com/docs/api.html#index_Mongoose-model
  var collection = "Posted";
  mongoose.model('Posted', PostedSchema, collection);
};

//ドキュメント生成
module.exports.dbinsert = function(mongoose, dbobj) {
  var Posted = mongoose.model('Posted');
  // MEMO: 新規オブジェクトの作成はこれでやらないとdefaultも全てnullでオーバーライトされる
  var posted = new Posted(dbobj);
  posted.save(function(err) {
    if(err){ console.log(err); }
  });
};
