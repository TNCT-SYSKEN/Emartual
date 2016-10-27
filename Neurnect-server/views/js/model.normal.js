// コンストラクタ
function Normal(data){
  this.data = data;
}

// インスタンス保存
Normal.list = [];

// インスタンスをNormal.listに保存するメソッド
Normal.add_data = function(data){
  var normal = new Normal(data);

  this.list.push(normal);
};
