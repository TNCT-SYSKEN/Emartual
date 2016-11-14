function Conversation_View(){
}

// メソッド

// objectコンテナに関して,指定の位置まで移動させる
Conversation_View.moveObjectPosition = function(position){
  Conversation.object.position.x = position.x;
  Conversation.object.position.y = position.y;
};

// テーマオブジェクトの生成
Conversation_View.CreateSpecialObject = function(document){
  // テキストオブジェクトの生成
  let textObj = new PIXI.Text(document.text, {fontSize: '30px', fill: 0x1d2129});
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;
  Conversation.special_position.x = Field.renderer.width / 2;
  Conversation.special_position.y = Field.renderer.height / 2;
  textObj.position = Conversation.special_position;

  // 幾何学形の保存
  let graphics = new PIXI.Graphics();
  // graphicsプロパティ
  graphics.beginFill(0xFFFFFF);
  graphics.lineStyle(4, 0x4661df);

  // 幾何学形の描画設定
  let bias = 50;
  Conversation.special_size = this.CalcSize(textObj, ELLIPSE).width + bias;

  // 描画
  graphics.drawEllipse(Conversation.special_position.x, Conversation.special_position.y, Conversation.special_size, Conversation.special_size);
  Conversation.special_object.addChild(graphics);
  Conversation.special_object.addChild(textObj);

  Conversation.object.addChild(Conversation.special_object);
};

// 一般オブジェクトの生成
Conversation_View.CreateObject = function(document){
  let textObj = new PIXI.Text(document.text, {fontSize: '20px', fill: 0x1d2129});
  // アンカー
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;
  // 配置
  textObj.position = document.position;

  // 幾何学形の保存
  let graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.lineStyle(4, 0x4661df);
  // 線の保存
  let line = new PIXI.Graphics();
  line.beginFill(0xFFFFFF);
  line.lineStyle(4, 0x4661df);

  // 幾何学形の描画設定
  let objectSize = this.CalcSize(textObj, ELLIPSE);
  graphics.drawEllipse(document.position.x, document.position.y, objectSize.width, objectSize.height);

  line.moveTo(Conversation.special_position.x, Conversation.special_position.y);
  line.lineTo(textObj.position.x, textObj.position.y);

  // 描画
  Conversation.object.addChildAt(line, 0);
  Conversation.object.addChildAt(graphics, 1);
  Conversation.object.addChildAt(textObj, 2);
};

// オブジェクトに必要なサイズの計算
Conversation_View.CalcSize = function(CalctextObj, formData){
  // textのアンカーポイント変更
  CalctextObj.anchor.x = 0.5;
  CalctextObj.anchor.y = 0.5;

  var objectSize = null;

  // 描画オブジェクトのサイズ計算
  if (formData == ELLIPSE){
    let bias = {
      "x": 15,
      "y": 15
    };
    // Ellipse
    objectSize = {
      "width":  CalctextObj.width * Math.sqrt(2) / 2 + bias.x,
      "height": CalctextObj.height * Math.sqrt(2) / 2 + bias.y
    };
  }
  else if(formData == RECT){
    let bias = {
      "x": 45,
      "y": 20
    };
    // Rect
    objectSize = {
      "width":  CalctextObj.width + bias.x,
      "height": CalctextObj.height + bias.y
    };
  }

  CalctextObj = null;

  return objectSize;
};

// オブジェクトの配置計算
Conversation_View.CalcPosition = function(textData, formData){

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

  // アニメーションメソッドの呼び出し
  this.animate();
};

// アニメーションメソッド
Conversation_View.animate = function(){
  requestAnimationFrame(Conversation_View.animate);

  //ルートコンテナの描画
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
