function Conversation(data){
  this.data = data;
  this.object = new PIXI.Container();
  this.special_object = new PIXI.Container();
}

// プロパティ
// インスタンス保存
Conversation.list = [];
// オブジェクトコンテナ
Conversation.object = new PIXI.Container();
Conversation.special_object = new PIXI.Container();

// 数値保存
Conversation.special_position = {};
Conversation.special_size = null;

Conversation.add_data = function(data){
  let conversation = new Conversation(data);

  this.list.push(conversation);
};

Conversation.clear_data = function(){
  this.list = [];
};
