function Conversation(data){
  this.data = data;
  this.object = new PIXI.Container();
  this.special_object = new PIXI.Container();
}

// プロパティ
// インスタンス
Conversation.list = [];
Conversation.theme = null;
// オブジェクトコンテナ
Conversation.object = new PIXI.Container();
Conversation.special_object = new PIXI.Container();

// 数値
Conversation.special_position = {};
Conversation.special_size = null;

// アニメーションID
Conversation._animationID = null;

Conversation.add_data = function(data){
  let conversation = new Conversation(data);

  this.list.push(conversation);
};

Conversation.set_theme = function(theme){
  this.theme = theme;
};

Conversation.clear_data = function(){
  this.list = [];
  this.theme = null;
};
