// MEMO: 抽出されたドキュメントはcallbackに渡すこととする
// MEMO: 理由: 非同期I/OのためPosted.findが後から実行される可能性があるため
// MEMO: 理由: つまるところundefinedの状態でmongoose-test.jsの処理が進む
// MEMO: これを全てに適用して

//全件抽出
module.exports.dball = function(callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.find({}, function(err, docs) {
    if(err){ console.log(err); }

     // callbackの起動
     callback(docs);
  });
};

//全件抽出 IDのみ
module.exports.dballid = function(callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.find({}, function(err, docs){
    if(err){ console.log(err); }

    callback(docs);
  }).select('_id');
};

//タグ毎に抽出
module.exports.dbtag = function(tag, callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.find({ tag: tag }, function(err, docs) {
    if(err){ console.log(err); }

    callback(docs);
  });
};

//タグ毎に抽出　IDのみ
module.exports.dbtagid = function(tag, callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.find({ tag: tag }, function(err, docs) {
    if(err){ console.log(err); }

    callback(docs);
  }).select('_id');
};

//各タグに対する投稿数
module.exports.dbtagcount = function(tag, callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.count({ tag: tag }, function(err, count) {
    if(err){ console.log(err); }

    callback(count);
  });
};

//カテゴリ毎に抽出
module.exports.dbcate = function(category, callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.find({ category: category }, function(err, docs) {
    if(err){ console.log(err); }

    callback(docs);
  });
};

//カテゴリ毎に抽出 IDのみ
module.exports.dbcateid = function(category, callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.find({ category: category }, function(err, docs) {
    if(err){ console.log(err); }

    callback(docs);
  }).select('_id');
};

//各カテゴリに対する投稿数
module.exports.dbcatecount = function(category, callback) {
  var Posted_data = this.mongoose.model('Posted_data');
  Posted_data.count({ cate: cate }, function(err, count) {
    if(err){ console.log(err); }

    callback(count);
  });
};

//ポジションの最大最小の確認
module.exports.dbposition =function(callback){
  var Posted_data = this.mongoose.model('Posted_data');
  var position = {};

  Posted_data.find({}, function(err, docs) {
    if(err){console.log(err);}
    position.x_max = docs[0].position;
  }).select('position').sort('-position.x').limit(1);
  Posted_data.find({}, function(err, docs) {
    if(err){console.log(err);}
    position.y_max = docs[0].position;
  }).select('position.y').sort('-position.y').limit(1);
  Posted_data.find({}, function(err,docs) {
    if(err){console.log(err);}
    position.y_min = docs[0].position;
    callback(position);
  }).select('position.y').sort('+position.y').limit(1);
};
