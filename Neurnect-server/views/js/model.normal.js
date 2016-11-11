// コンストラクタ
function Normal(data){
  this.data = data;
}

// インスタンス保存
Normal.list = [];

// インスタンスをNormal.listに保存する
Normal.add_data = function(data){
  var normal = new Normal(data);

  this.list.push(normal);
};

// listに保存されているインスタンスをすべて削除する
Normal.clear_data = function(){
  this.list = [];
};
