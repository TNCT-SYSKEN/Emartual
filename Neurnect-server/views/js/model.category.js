function Category(category){
  this.category = category;
}

// 現在のカテゴリ名を保存するプロパティ
Category.cate_name = null;

// 指定したカテゴリ名に置換する
Category.set_name = function(name){
  var category = new Category(name);

  this.cate_name = category;
};

Category.get_name = function(){
  return this.cate_name.category;
};
