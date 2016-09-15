//likeに＋１
module.exports.dblike = function(id) {
  Posted_data.update({ id: id }, { $inc: { like: 1 } },
    { upsert: false, multi: false }, function(err) {
    console.log(err);
  });
};

//投稿を削除
module.exports.dbremove = function(id) {
  Posted_data.remove({ id: id }, function(err) {
    console.log(err);
  });
};
