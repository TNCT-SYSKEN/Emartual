//全件抽出
var dballfind = function() {
    Posted.find({}, function(err, docs) {
      return (docs);
}

//全件抽出 IDのみ
var dballid = function() {
    posted.find({}, {'_id'}, function(err, docs){
      return (docs);
    });
}

//

//タグ毎に抽出
var dbtag = function(tag) {
  Posted.find({ tag: posted.tag }, function(err, docs) {
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}

//カテゴリ毎に抽出
var dbcate = function(cate) {
  Posted.find({ cate: posted.cate }, function(err, docs) {
    if(err){ console.log(error); }
    else{ return (docs); }
  });
}
