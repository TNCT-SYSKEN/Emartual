//レンダラの作成とDOM操作での要素追加
const RENDERER_STYLE = {antialias: true, backgroundColor: 0xf7f7f7};
let renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, RENDERER_STYLE);
$('#container').append(renderer.view);

// ルートコンテナの作成
var stage = new PIXI.Container();
// Graphicsコンテナの作成
var graphics = new PIXI.Graphics();
// オブジェクトコンテナの作成
var object = new PIXI.Container();

// line,text,Ellipseの描画
graphics.beginFill(0xFFFFFF);
graphics.lineStyle(4, 0x4661df);

// lineの描画
graphics.moveTo(renderer.width / 2, 200);
graphics.lineTo(renderer.width * 2 / 3, 400);

// textの描画
var text = new PIXI.Text("Hello, Pixi!", {fontSie:'16px', fill: 0x1d2129});
text.anchor.x = 0.5;
text.anchor.y = 0.5;
text.position.x = renderer.width / 2;
text.position.y = 200;

// Ellipseの描画
graphics.drawEllipse(renderer.width / 2, 200, 100, 50);

graphics.moveTo(renderer.width * 2 / 3, 400);
graphics.lineTo(renderer.width * 2 / 3, 0);

graphics.drawEllipse(renderer.width * 2 / 3, 400, 100, 50);
var text2 = new PIXI.Text("Neurnectの世界へようこそ", {fontSie:'16px', fill: 0x1d2129});
text2.anchor.x = 0.5;
text2.anchor.y = 0.5;
text2.position.x = renderer.width * 2 / 3;
text2.position.y = 400;

graphics.drawEllipse(renderer.width * 2 / 3, 0, 100, 50);
var text3 = new PIXI.Text("さあ、始めましょう", {fontSie:'16px', fill: 0x1d2129});
text3.anchor.x = 0.5;
text3.anchor.y = 0.5;
text3.position.x = renderer.width * 2 / 3;
text3.position.y = 0;

// オブジェクトコンテナに追加
object.addChild(graphics);
object.addChild(text);
object.addChild(text2);
object.addChild(text3);

object.interactive = true;
object.buttonMode = true;

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
