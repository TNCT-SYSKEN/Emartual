function Conversation_View(){
}

// メソッド

// テーマオブジェクトの生成
Conversation_View.CreateSpecialObject = function(document){
  // テキストオブジェクトの生成
  let textObj = new PIXI.Text(document.text, {fontSize: '30px', fill: 0x1d2129});
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;
  textObj.position.x = 100;
  textObj.position.y = 100;
  // 幾何学形の保存
  let graphics = new PIXI.Graphics();
  // graphicsプロパティ
  graphics.beginFill(0xFFFFFF);
  graphics.lineStyle(4, /*color*/0x0000FF);

  // 幾何学形の描画
  // テスト用
  graphics.drawEllipse(100, 100, 200, 200);
  Conversation.special_object.addChildAt(graphics, 0);
  Conversation.special_object.addChildAt(textObj, 1);

  Conversation.object.addChild(Conversation.special_object);
};

// 一般オブジェクトの生成
Conversation_View.CreateObject = function(document){
  console.log(document.text);
  let textObj = new PIXI.Text(document.text, {fontSize: '20px', fill: 0x1d2129});
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;
  textObj.position.x = 200;
  textObj.position.y = 200;

  // test
  Conversation.object.addChild(textObj);

  Field.stage.addChild(Conversation.object);
  Field.renderer.render(Field.stage);

  this.animate();
};

// アニメーションメソッド
Conversation_View.animate = function(){
  requestAnimationFrame(Conversation_View.animate);

  Field.renderer.render(Field.stage);
};

// レンダラの描画開始
Conversation_View.DrawObject = function(){
  Conversation.object.interactive = true;

  // ドラッグ有効化
  Conversation.object
    .on('mousedown', this.onDragStart)
    .on('touchstart', this.onDragStart)
    .on('mouseup', this.onDragEnd)
    .on('mouseupoutside', this.onDragEnd)
    .on('touchend', this.onDragEnd)
    .on('touchendoutside', this.onDragEnd)
    .on('mousemove', this.onDragMove)
    .on('touchmove', this.onDragMove);

  // オブジェクトコンテナをルートコンテナに追加
  Field.stage.addChild(Conversation.object);

  //ルートコンテナの描画
  Field.renderer.render(Field.stage);

  // アニメーションメソッドの呼び出し
  this.animate();
};

// アニメーションメソッド
Conversation_View.animate = function(){
  requestAnimationFrame(Conversation_View.animate);

  Field.renderer.render(Field.stage);
};

// ドラッグ開始時のイベント
Conversation_View.onDragStart = function(event){
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.dragging = true;
  this.dragPoint = event.data.getLocalPosition(this.parent);
  this.dragPoint.x -= this.position.x;
  this.dragPoint.y -= this.position.y;
};

// ドラッグ中のイベント
Conversation_View.onDragMove = function(){
  if(this.dragging){
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x - this.dragPoint.x;
    this.position.y = newPosition.y - this.dragPoint.y;
  }
};

// ドラッグ終了時のイベント
Conversation_View.onDragEnd = function(){
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
};

Conversation_View.resizeContainer = function(){
  Field.renderer.resize(Field.$container.width(), window.innerHeight);
};
