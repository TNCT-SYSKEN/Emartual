var posted_data = require('./DB_method/posted_data.js');

posted_data.dbdefine(mongoose);

]//全件抽出
module.exports.dball = function(Posted) {
  Posted.find({}, function(err, docs) {
    if(err){ console.log(err); }
    else{
      return (docs);
     }
   }
};

//全件抽出 IDのみ
module.exports.dballid = function() {
  Posted.find({}, {'_id'}, function(err, docs){
    if(err){ console.log(err); }
    else{ return (docs); }
  });
};

//タグ毎に抽出
module.exports.dbtag = function(tag) {
  Posted.find({ tag: tag }, function(err, docs) {
    if(err){ console.log(err); }
    else{ return (docs); }
  });
};

//タグ毎に抽出　IDのみ
module.exports.dbtagid = function(tag) {
  Posted.find({ tag: tag }, {'_id'}, function(err, docs) {
    if(err){ console.log(err); }
    else{ return (docs); }
  });
};

//各タグに対する投稿数
module.exports.dbtagcount = function(tag) {
  Posted.count({ tag: tag }, function(err, count) {
    if(err){ console.log(err); }
    else{ return (count); }
  });
};

//カテゴリ毎に抽出
module.exports.dbcate = function(cate) {
  Posted.find({ cate: cate }, function(err, docs) {
    if(err){ console.log(err); }
    else{ return (docs); }
  });
};

//カテゴリ毎に抽出 IDのみ
module.exports.dbcateid = function(cate) {
  Posted.find({ cate: cate }, {'_id'}, function(err, docs) {
    if(err){ console.log(err); }
    else{ return (docs); }
  });
};

//各カテゴリに対する投稿数
module.exports.dbcatecount = function(cate) {
  Posted.count({ cate: cate }, function(err, count) {
    if(err){ console.log(err); }
    else{ return (count); }
  });
};
