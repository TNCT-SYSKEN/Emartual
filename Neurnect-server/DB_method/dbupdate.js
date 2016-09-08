//likeに＋１
var dblike = function(id) {
  Posted.update({ id: id }, { $inc: { like: 1 } },
    { upsert: false, multi: false }, function(err) {
    console.log(error);
  });
};

//投稿を削除
var dbremove = function(id) {
  Posted.remove({ id: id }, function(err) {
    console.log(error);
  });
}
