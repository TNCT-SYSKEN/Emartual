$('#post').click(() => {
  $('.form').draggable();
  $('.form').fadeIn("fast");
});

$('#form_remove').click(() => {
  $('.form').fadeOut("fast");
})

$('#reload').click(() => {
  DrawObject();
});

var socket = io.connect('http://localhost:1337/');

//レンダラの作成とDOM操作での要素追加
const RENDERER_STYLE = {antialias: true, backgroundColor: 0xf7f7f7};
let renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight, RENDERER_STYLE);
$('#container').append(renderer.view);

// ルートコンテナの作成
let stage = new PIXI.Container();
// オブジェクトコンテナの作成
let object = new PIXI.Container();
// Graphicsコンテナの作成
let line = new PIXI.Graphics();
let graphics = new PIXI.Graphics();


// 前回のオブジェクトの位置
let before_position = null;

// タグ描画が2回以降であるか
let tag_draw_flag = false

socket.on('init_data', function(init_data){
  for(let item of init_data){
    CreateObject(item.text, item.form, item.position);
  }
  object.addChildAt(line, 0);
  object.addChildAt(graphics, 1);
  DrawObject();
});

function CreateObject(textData, formData, positionData){
  const ELLIPSE = "ellipse";
  const RECT = "rect";

  // 描画プロパティ
  line.beginFill(0xFFFFFF);
  graphics.beginFill(0xFFFFFF);
  line.lineStyle(4, 0x4661df);
  graphics.lineStyle(4, 0x4661df);


  if(! tag_draw_flag){
    tag_draw_flag = true;
  }
  else{
    // lineの描画
    line.moveTo(before_position.x, before_position.y);
    line.lineTo(positionData.x, positionData.y);
  }

  // 前回のオブジェクトの位置
  before_position = positionData;

  // textの描画
  var textObj = new PIXI.Text(textData, {fontSize:'20px', fill: 0x1d2129});

  // textの配置変更
  textObj.position.x = positionData.x;
  textObj.position.y = positionData.y;
  // textのアンカーポイント変更
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;

  if (formData == ELLIPSE){
    // Ellipseの描画
    graphics.drawEllipse(positionData.x, positionData.y, textObj.width / 2 + 45, textObj.height / 2 + 20);

  }
  else if(formData == RECT){
    // Rectの描画
    graphics.drawRect(positionData.x - (textObj.width + 45) / 2, positionData.y - (textObj.height + 20) / 2, textObj.width + 45, textObj.height + 20);
  }

  // オブジェクトコンテナに追加
  object.addChildAt(line, 0);
  object.addChildAt(graphics, 1);
  object.addChildAt(textObj, 2);
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

  console.log("アニメーション呼び出し前");

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
