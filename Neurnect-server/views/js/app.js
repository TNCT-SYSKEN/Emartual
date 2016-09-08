$('#reload').click(() => {
  DrawObject();
});


//レンダラの作成とDOM操作での要素追加
const RENDERER_STYLE = {antialias: true, backgroundColor: 0xf7f7f7};
let renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, RENDERER_STYLE);
$('#container').append(renderer.view);

// ルートコンテナの作成
let stage = new PIXI.Container();
// オブジェクトコンテナの作成
let object = new PIXI.Container();
// Graphicsコンテナの作成
let graphics = new PIXI.Graphics();


socket.on('init_data', function(init_data){
  for(let item of init_data){
    CreateObject(item.text, item.form, item.position);
  }
  DrawObject();
});

function CreateObject(textData, formData, positionData){
  const ELLIPSE = "ellipse";
  const RECT = "rect";

  // 描画プロパティ
  graphics.beginFill(0xFFFFFF);
  graphics.lineStyle(4, 0x4661df);

  // lineの描画
  graphics.moveTo(renderer.width / 2, 200);
  graphics.lineTo(renderer.width * 2 / 3, 400);

  // textの描画
  var textObj = new PIXI.Text(textData, {fontSize:'20px', fill: 0x1d2129});
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;
  textObj.position.x = renderer.width / 2;
  textObj.position.y = 200;

  if (formData == ELLIPSE){
    // Ellipseの描画
    graphics.drawEllipse(renderer.width / 2, 200, textObj.width / 2 + 45, textObj.height / 2 + 20);
  }
  else if(formData == RECT){
    graphics.drawRect(renderer.width / 2, 200, textObj.width / 2 + 45, textObj.height / 2 + 20);
  }

  // オブジェクトコンテナに追加
  object.addChild(graphics);
  object.addChild(textObj);
}

function DrawObject(){
  object.interactive = true;

  // ドラッグ有効化
  object
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

  // オブジェクトコンテナをルートコンテナに追加
  stage.addChild(object);
  //ルートコンテナの描画
  renderer.render(stage);

  // アニメーションメソッドの呼び出し
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(stage);
}

function onDragStart(event){
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.dragging = true;
  this.dragPoint = event.data.getLocalPosition(this.parent);
  this.dragPoint.x -= this.position.x;
  this.dragPoint.y -= this.position.y;
}

function onDragMove(){
  if(this.dragging){
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x - this.dragPoint.x;
    this.position.y = newPosition.y - this.dragPoint.y;
  }
}

function onDragEnd(){
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}
