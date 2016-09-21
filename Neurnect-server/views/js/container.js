//レンダラの作成とDOM操作での要素追加
const RENDERER_STYLE = {antialias: true, backgroundColor: 0xf7f7f7};
const ELLIPSE = "ellipse";
const RECT = "rect";
let renderer = new PIXI.autoDetectRenderer(window.innerWidth - 15, window.innerHeight, RENDERER_STYLE);
$('#container').append(renderer.view);

// ルートコンテナの作成
let stage = new PIXI.Container();
// オブジェクトコンテナの作成
let object = new PIXI.Container();
// Graphicsコンテナとlineのコンテナをタグ毎に管理
let tag_object = [];

// 前回のオブジェクトの位置
let before_position = [];

// 前回のオブジェクトのサイズ
let before_size = [];

function CalcSize(textData, formData){
  // textのオブジェクトサイズ計算
  var CalctextObj = new PIXI.Text(textData, {fontSize:'20px', fill: 0x1d2129});

  // textのアンカーポイント変更
  CalctextObj.anchor.x = 0.5;
  CalctextObj.anchor.y = 0.5;

  var objectSize = null;

  // 描画オブジェクトのサイズ計算
  if (formData == ELLIPSE){
    // Ellipse
    objectSize = {
      "width":  CalctextObj.width / 2 + 45,
      "height": CalctextObj.height / 2 + 20
    };
  }
  else if(formData == RECT){
    // Rectの描画
    objectSize = {
      "width":  CalctextObj.width + 45,
      "height": CalctextObj.height + 20
    };
  }

  CalctextObj = null;

  return objectSize;
}

function CalcPosition(textData, formData, tagData){
  // 0, 1, 2, 3の4値の乱数取得
  var form_rand = Math.floor(Math.random() * (4 - 0) + 0);

  // 描画予定のオブジェクトの配置保存
  var objectPosition = null;
  // 描画予定のオブジェクトのサイズ計算
  var objectSize = CalcSize(textData, formData);

  var scalar_x = Math.floor(Math.random() * (20 - 0) + 0);
  var scalar_y = Math.floor(Math.random() * (30 - 0) + 0);

  var before_position_index = isTagIn(before_position, tagData);
  var before_size_index = isTagIn(before_size, tagData);
  if(before_position_index === null || before_size_index === null){
    // タグの初回挿入

    console.log("通った");

    return objectPosition;
  }

  // 乱数を基に配置調整(象限変更)
  switch(form_rand){
    case 0:
      objectPosition = {
        "x": before_position[before_position_index].x + before_size[before_size_index].width + objectSize.width + scalar_x,
        "y": before_position[before_position_index].y + before_size[before_size_index].height + objectSize.height + scalar_y
      };
      break;

    case 1:
      objectPosition = {
        "x": before_position[before_position_index].x + before_size[before_size_index].width + objectSize.width - scalar_x,
        "y": before_position[before_position_index].y + before_size[before_size_index].height + objectSize.height + scalar_y
      };
      break;

    case 2:
      objectPosition = {
        "x": before_position[before_position_index].x + before_size[before_size_index].width + objectSize.width + scalar_x,
        "y": before_position[before_position_index].y - before_size[before_size_index].height - objectSize.height - scalar_y
      };
      break;

    case 3:
      objectPosition = {
        "x": before_position[before_position_index].x + before_size[before_size_index].width + objectSize.width - scalar_x,
        "y": before_position[before_position_index].y - before_size[before_size_index].height - objectSize.height - scalar_y
      };
      break;
  }

  return objectPosition;
}

// 引数のオブジェクトに引数のタグが存在しているか
// 存在している場合は配列のインデックス，居ない場合はnullを返す
function isTagIn(listobject, tag){
  for(var i = 0; i < listobject.length; i++){
    if(listobject[i].tag == tag){
      return i;
    }
  }

  return null;
}

function CreateObject(document){
  var tag_object_index = isTagIn(tag_object, document.tag);

  if(tag_object_index === null){
    tag_object.push({
      "tag": document.tag,
      "graphics": new PIXI.Graphics(),
      "line": new PIXI.Graphics()
    });
    tag_object_index = isTagIn(tag_object, document.tag);
  }

  let line = tag_object[tag_object_index].line;
  let graphics = tag_object[tag_object_index].graphics;

  // 描画プロパティ
  line.beginFill(0xFFFFFF);
  graphics.beginFill(0xFFFFFF);
  line.lineStyle(4, 0x4661df);
  graphics.lineStyle(4, 0x4661df);

  // 前回のオブジェクトの位置
  var before_position_index = isTagIn(before_position, document.tag);

  if(before_position_index === null){
    before_position.push({
      "tag": document.tag
    });
    before_position_index = isTagIn(before_position, document.tag);
  }
  else{
    // lineの描画
    line.moveTo(before_position[before_position_index].x, before_position[before_position_index].y);
    line.lineTo(document.position.x, document.position.y);
  }
  before_position[before_position_index].x = document.position.x;
  before_position[before_position_index].y = document.position.y;

  // textの描画
  var textObj = new PIXI.Text(document.text, {fontSize:'20px', fill: 0x1d2129});

  // textの配置変更
  textObj.position.x = document.position.x;
  textObj.position.y = document.position.y;
  // textのアンカーポイント変更
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;

  // オブジェクトのサイズ計算
  var objectSize = CalcSize(document.text, document.form);

  if (document.form == ELLIPSE){
    // Ellipseの描画
    graphics.drawEllipse(document.position.x, document.position.y, objectSize.width, objectSize.height);

  }
  else if(document.form == RECT){
    // Rectの描画
    graphics.drawRect(document.position.x - (textObj.width + 45) / 2, document.position.y - (textObj.height + 20) / 2, objectSize.width, objectSize.height);
  }

  // 前回のオブジェクトのサイズ
  var before_size_index = isTagIn(before_size, document.tag);
  if(before_size_index === null){
    before_size.push({
      "tag": document.tag
    });
    before_size_index = isTagIn(before_size, document.tag);
  }
  before_size[before_size_index].width = objectSize.width;
  before_size[before_size_index].height = objectSize.height;

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
