// Socket.IOコネクション
var socket = io.connect('http://localhost:1337/');

$('form').submit(function (e){
  // formのsubmit時のページ遷移停止
  e.preventDefault();

  // データのemit
  socket.emit('upload_data', {
    "text": $("input#uploadtext").val(),
    "form": $('#graphic-form').val(),
    "image": "画像URL",
    "position": {"x": "x座標", "y": "y座標"},
    "category": "カテゴリ名",
    "tag": "タグ名",
    "link": "ライン接続先オブジェクトのドキュメントid",
    "date": "投稿日時"
  });

  // 投稿フォーム非表示
  $('.form').fadeOut("fast");
});

$('#post').click(function (){
  // 投稿フォーム表示
  $('.form').draggable();
  $('.form').fadeIn("fast");

  // selectタグ初期化
  $('#graphic-form').prop("selectedIndex", 0);
  console.log($('#graphic-form').prop("selectedIndex"));

});

$('#form_remove').click(function (){
  // 投稿フォーム非表示
  $('.form').fadeOut("fast");
});

$('#reload').click(function (){
  var text = "ほげほげ";
  var form = "rect";

  var objectPosition = CalcPosition(text, form);

  CreateObject(text, form, objectPosition);

  DrawObject();
});

$('#graphic-form').change(function (){
  var str = $(this).val();

  // 投稿フォーム後ろの変更をしたい
  console.log(str);
});

//レンダラの作成とDOM操作での要素追加
const RENDERER_STYLE = {antialias: true, backgroundColor: 0xf7f7f7};
const ELLIPSE = "ellipse";
const RECT = "rect";
let renderer = new PIXI.CanvasRenderer(window.innerWidth - 15, window.innerHeight, RENDERER_STYLE);
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

// 前回のオブジェクトのサイズ(debug用)
let before_size = null;

// タグ描画が2回以降であるか
let tag_draw_flag = false

let init_isfirst = false;

socket.on('init_data', function(init_data){
  if(! init_isfirst){
    for(let item of init_data){
      CreateObject(item.text, item.form, item.position);
    }
    object.addChildAt(line, 0);
    object.addChildAt(graphics, 1);
    DrawObject();

    init_isfirst = true;
  }
});

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

function CalcPosition(textData, formData){
  // 0, 1, 2, 3の4値の乱数取得
  var form_rand = Math.floor(Math.random() * (4 - 0) + 0);

  // 描画予定のオブジェクトの配置保存
  var objectPosition = null;
  // 描画予定のオブジェクトのサイズ計算
  var objectSize = CalcSize(textData, formData);

  var scalar_x = Math.floor(Math.random() * (20 - 0) + 0);
  var scalar_y = Math.floor(Math.random() * (30 - 0) + 0);

  // 乱数を基に配置調整(象限変更)
  switch(form_rand){
    case 0:
      objectPosition = {
        "x": before_position.x + before_size.width + objectSize.width + scalar_x,
        "y": before_position.y + before_size.height + objectSize.height + scalar_y
      };
      break;

    case 1:
      objectPosition = {
        "x": before_position.x + before_size.width + objectSize.width - scalar_x,
        "y": before_position.y + before_size.height + objectSize.height + scalar_y
      };
      break;

    case 2:
      objectPosition = {
        "x": before_position.x + before_size.width + objectSize.width + scalar_x,
        "y": before_position.y - before_size.height - objectSize.height - scalar_y
      };
      break;

    case 3:
      objectPosition = {
        "x": before_position.x + before_size.width + objectSize.width - scalar_x,
        "y": before_position.y - before_size.height - objectSize.height - scalar_y
      };
      break;
  }

  return objectPosition;
}

function CreateObject(textData, formData, positionData){
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

  var objectSize = CalcSize(textData, formData);

  if (formData == ELLIPSE){
    // Ellipseの描画
    graphics.drawEllipse(positionData.x, positionData.y, objectSize.width, objectSize.height);

  }
  else if(formData == RECT){
    // Rectの描画
    graphics.drawRect(positionData.x - (textObj.width + 45) / 2, positionData.y - (textObj.height + 20) / 2, objectSize.width, objectSize.height);
  }

  // 前回のオブジェクトのサイズ(debug用)
  before_size = objectSize;

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
