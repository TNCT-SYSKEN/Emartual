// 設計は良くない
function Normal_Tag(tag){
  Normal_Tag.list.push(tag);
}

Normal_Tag.list = [];

// listに保存されているデータを全て削除する
Normal_Tag.clear_data = function(){
  this.list = [];
};
