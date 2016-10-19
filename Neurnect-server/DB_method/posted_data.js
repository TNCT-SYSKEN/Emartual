//スキーマ定義
module.exports.dbdefine = function() {
  var Schema = this.mongoose.Schema;

  // MEMO: requiredってtextとかformとかにも必要だと思うので吟味して再設計してください
  var Posted_dataSchema = new Schema ({
    text:   { type: String, required: true },
    form:   { type: String, enum: ['ellipse', 'rect', 'unique'], default: "ellipse" },
    image:  { type: String },
    // MEMO: Syntax修正
    position:    { x: { type: Number, required: true }, y: { type: Number, required: true } },
    // MEMO: 仮にプロパティ名をcategoryに変更しているので何とかしてください
    // MEMO: ついでに設計書も変えてください
    category:   { type: String, enum: ['normal', 'conversation'], default: "normal" },
    tag:    { type: String, required: true },
    like:   { type: Number, default: 0 },
    link:   { type: String },
    date:   { type: Date, default: Date.now }
  });
  // MEMO: モデル名, コレクション名を変更していないので何とかしてください(Mongoose doc(下記URL)を参照のこと)
  // MEMO: http://mongoosejs.com/docs/api.html#index_Mongoose-model
  // MEMO: コレクション名は設計書に記述しておいてください
  var collection = "Posted_data";
  this.mongoose.model('Posted_data', Posted_dataSchema, collection);
};

//ドキュメント生成
module.exports.dbinsert = function(dbobj) {
  var Posted_data = this.mongoose.model('Posted_data');
  // MEMO: 新規オブジェクトの作成はこれでやらないとdefaultも全てundefinedでオーバーライトされる
  var posted_data = new Posted_data(dbobj);
  posted_data.save(function(err) {
    if(err){ console.log(err); }
  });
};
