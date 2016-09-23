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

//タグ毎に抽出 IDのみ
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
  Posted_data.count({ category: category }, function(err, count) {
    if(err){ console.log(err); }

    callback(count);
  });
};

//xの最大値の抽出
module.exports.dbposition_x_max =function(callback){
  var Posted_data = this.mongoose.model('Posted_data');

  Posted_data.find({}, function(err, docs) {
    if(err){console.log(err);}

    callback(docs[0].position);
  }).select('position').sort('-position.x').limit(1);
};

//yの最大値の抽出
module.exports.dbposition_y_max =function(callback){
  var Posted_data = this.mongoose.model('Posted_data');

  Posted_data.find({}, function(err, docs) {
    if(err){console.log(err);}

    callback(docs[0].position);
  }).select('position.y').sort('-position.y').limit(1);
};

//yの最小値の抽出
module.exports.dbposition_y_min =function(callback){
  var Posted_data = this.mongoose.model('Posted_data');

  Posted_data.find({}, function(err,docs) {
    if(err){console.log(err);}

    callback(docs[0].position);
  }).select('position.y').sort('+position.y').limit(1);
};
