//全件抽出
var dball = function() {
  Posted.find({}, function(err, docs) {
    if(err){ console.log(error); }
    else{
      return (docs); 
     }
}

//全件抽出 IDのみ
var dballid = function() {
  Posted.find({}, {'_id'}, function(err, docs){
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}

//タグ毎に抽出
var dbtag = function(tag) {
  Posted.find({ tag: tag }, function(err, docs) {
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}

//タグ毎に抽出　IDのみ
var dbtagid = function(tag) {
  Posted.find({ tag: tag }, {'_id'}, function(err, docs) {
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}

//各タグに対する投稿数
var dbtagcount = function(tag) {
  Posted.count({ tag: tag }, function(err, count) {
    if(err){ console.log(error); }
    else{ return (count); }
  });
}

//カテゴリ毎に抽出
var dbcate = function(cate) {
  Posted.find({ cate: cate }, function(err, docs) {
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}

//カテゴリ毎に抽出 IDのみ
var dbcateid = function(cate) {
  Posted.find({ cate: cate }, {'_id'}, function(err, docs) {
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}

//各カテゴリに対する投稿数
var dbcatecount = function(cate) {
  Posted.count({ cate: cate }, function(err, count) {
    if(err){ console.log(error); }
    else{ return (count); }
  });
}
