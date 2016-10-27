// コンストラクタ
function Normal_View(){
  // オブジェクトコンテナの作成
  this.object = new PIXI.Container();
}

// プロパティ

// オブジェクトコンテナ
Normal_View.object = new PIXI.Container();
// Graphicsコンテナとlineのコンテナをタグ毎に管理
Normal_View.tag_object = [];

// 前回のオブジェクトの位置
Normal_View.before_position = [];

// 前回のオブジェクトのサイズ
Normal_View.before_size = [];

// objectコンテナに関して,指定の位置まで移動させる
Normal_View.moveObjectPosition = function(position){
  this.object.position.x = position.x;
  this.object.position.y = position.y;
};

// オブジェクトに必要なサイズの計算
Normal_View.CalcSize = function(textData, formData){
  // textのオブジェクトサイズ計算
  var CalctextObj = new PIXI.Text(textData, {fontSize:'20px', fill: 0x1d2129});

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

// 新しく作成したオブジェクトの配置の計算
Normal_View.CalcPosition = function(textData, formData, tagData){
  // 0, 1, 2, 3の4値の乱数取得
  var form_rand = this.createRandomVal(4, 0);

  // 描画予定のオブジェクトの配置保存
  var objectPosition = null;
  // 描画予定のオブジェクトのサイズ計算
  var objectSize = this.CalcSize(textData, formData);

  // バイアス(ランダム値)の最大値
  var rand_max = {
    "x": 20,
    "y": 200
  };

  var bias = {
    "x": this.createRandomVal(rand_max.x, 0),
    "y": this.createRandomVal(rand_max.y, 0)
  };

  var before_position_index = this.isTagIn(this.this.before_position, tagData);
  var before_size_index = this.isTagIn(this.before_size, tagData);

  // タグの初回挿入
  if(before_position_index === null || before_size_index === null){
    let bias_x = {
      "min": 20,
      "max": 70
    };
    // 10文字の日本語テキストを描画した際のサイズ
    let textwidth_10em = 201;
    // rectのもの(これが最大)
    let graphicswidth_bias = 20;
    objectPosition = {
      "x": objectSize.width + position_limit.x_max + textwidth_10em + graphicswidth_bias + this.createRandomVal(bias_x.max, bias_x.min),
      "y": this.createRandomVal(position_limit.y_max, position_limit.y_min)
    };

    return objectPosition;
  }

  // 乱数を基に配置調整(象限変更)
  switch(form_rand){
    case 0:
      objectPosition = {
        "x": this.before_position[before_position_index].x + this.before_size[before_size_index].width + objectSize.width + bias.x,
        "y": this.before_position[before_position_index].y + this.before_size[before_size_index].height + objectSize.height + bias.y
      };
      break;

    case 1:
      objectPosition = {
        "x": this.before_position[before_position_index].x + this.before_size[before_size_index].width + objectSize.width - bias.x,
        "y": this.before_position[before_position_index].y + this.before_size[before_size_index].height + objectSize.height + bias.y
      };
      break;

    case 2:
      objectPosition = {
        "x": this.before_position[before_position_index].x + this.before_size[before_size_index].width + objectSize.width + bias.x,
        "y": this.before_position[before_position_index].y - this.before_size[before_size_index].height - objectSize.height - bias.y
      };
      break;

    case 3:
      objectPosition = {
        "x": this.before_position[before_position_index].x + this.before_size[before_size_index].width + objectSize.width - bias.x,
        "y": this.before_position[before_position_index].y - this.before_size[before_size_index].height - objectSize.height - bias.y
      };
      break;
  }

  return objectPosition;
};

// 引数のオブジェクトに引数のタグが存在しているか
// 存在している場合は配列のインデックス，居ない場合はnullを返す
Normal_View.isTagIn = function(listobject, tag){
  for(var i = 0; i < listobject.length; i++){
    if(listobject[i].tag == tag){
      return i;
    }
  }

  return null;
};

// オブジェクトの挿入
Normal_View.CreateObject = function(document){
  var tag_label = null;

  var tag_object_index = this.isTagIn(this.tag_object, document.tag);

  if(tag_object_index === null){
    this.tag_object.push({
      "tag": document.tag,
      "graphics": new PIXI.Graphics(),
      "line": new PIXI.Graphics()
    });
    tag_object_index = this.isTagIn(this.tag_object, document.tag);

    // タグ名のラベル表示
    tag_label = new PIXI.Text("#" + document.tag, {fontSize:'20px', fill: 0x1d2129});
  }

  let line = this.tag_object[tag_object_index].line;
  let graphics = this.tag_object[tag_object_index].graphics;

  // 描画プロパティ
  line.beginFill(0xFFFFFF);
  graphics.beginFill(0xFFFFFF);
  // タグ名を元に色を指定
  line.lineStyle(4, Normal_Tag.list[this.isTagIn(Normal_Tag.list, document.tag)].color);
  graphics.lineStyle(4, Normal_Tag.list[this.isTagIn(Normal_Tag.list, document.tag)].color);

  // 前回のオブジェクトの位置
  var before_position_index = this.isTagIn(this.before_position, document.tag);

  if(before_position_index === null){
    this.before_position.push({
      "tag": document.tag
    });
    before_position_index = this.isTagIn(this.before_position, document.tag);
  }
  else{
    // lineの描画
    line.moveTo(this.before_position[before_position_index].x, this.before_position[before_position_index].y);
    line.lineTo(document.position.x, document.position.y);
  }
  this.before_position[before_position_index].x = document.position.x;
  this.before_position[before_position_index].y = document.position.y;

  // textの描画
  var textObj = new PIXI.Text(document.text, {fontSize:'20px', fill: 0x1d2129});

  // textの配置変更
  textObj.position.x = document.position.x;
  textObj.position.y = document.position.y;
  // textのアンカーポイント変更
  textObj.anchor.x = 0.5;
  textObj.anchor.y = 0.5;

  // オブジェクトのサイズ計算
  var objectSize = this.CalcSize(document.text, document.form);

  if (document.form == ELLIPSE){
    // Ellipseの描画
    graphics.drawEllipse(document.position.x, document.position.y, objectSize.width, objectSize.height);
  }
  else if(document.form == RECT){
    // rect作成時のバイアス参考値
    let bias = {
      "x": 45,
      "y": 20
    };
    // Rectの描画
    graphics.drawRect(document.position.x - (textObj.width + bias.x) / 2, document.position.y - (textObj.height + bias.y) / 2, objectSize.width, objectSize.height);
  }

  // 前回のオブジェクトのサイズ
  var before_size_index = this.isTagIn(this.before_size, document.tag);
  if(before_size_index === null){
    this.before_size.push({
      "tag": document.tag
    });
    before_size_index = this.isTagIn(this.before_size, document.tag);
  }
  this.before_size[before_size_index].width = objectSize.width;
  this.before_size[before_size_index].height = objectSize.height;

  // オブジェクトコンテナに追加
  this.object.addChildAt(line, 0);
  this.object.addChildAt(graphics, 1);
  this.object.addChildAt(textObj, 2);

  // タグ名ラベルの追加
  if(tag_label !== null){
    // アンカー変更
    tag_label.anchor.x = 0.5;
    tag_label.anchor.y = 0.5;

    // 配置変更
    tag_label.position.x = textObj.position.x - objectSize.width - tag_label.width / 2;
    tag_label.position.y = textObj.position.y - objectSize.height - tag_label.height / 2;

    this.object.addChildAt(tag_label, 3);
  }
};

// レンダラの描画開始
Normal_View.DrawObject = function(){
  this.object.interactive = true;

  // ドラッグ有効化
  this.object
    .on('mousedown', this.onDragStart)
    .on('touchstart', this.onDragStart)
    .on('mouseup', this.onDragEnd)
    .on('mouseupoutside', this.onDragEnd)
    .on('touchend', this.onDragEnd)
    .on('touchendoutside', this.onDragEnd)
    .on('mousemove', this.onDragMove)
    .on('touchmove', this.onDragMove);

  // オブジェクトコンテナをルートコンテナに追加
  Field.stage.addChild(this.object);

  //ルートコンテナの描画
  Field.renderer.render(Field.stage);

  // アニメーションメソッドの呼び出し
  this.animate();
};

// アニメーションメソッド
Normal_View.animate = function(){
  requestAnimationFrame(Normal_View.animate);

  Field.renderer.render(Field.stage);
};

// ドラッグ開始時のイベント
Normal_View.onDragStart = function(event){
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  console.log(this);
  this.dragging = true;
  this.dragPoint = event.data.getLocalPosition(this.parent);
  this.dragPoint.x -= this.position.x;
  this.dragPoint.y -= this.position.y;
};

// ドラッグ中のイベント
Normal_View.onDragMove = function(){
  if(this.dragging){
    var newPosition = this.data.getLocalPosition(this.parent);
    console.log(this.position.x);
    this.position.x = newPosition.x - this.dragPoint.x;
    this.position.y = newPosition.y - this.dragPoint.y;
  }
};

// ドラッグ終了時のイベント
Normal_View.onDragEnd = function(){
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
};

Normal_View.resizeContainer = function(){
  renderer.resize($('#container').width(), window.innerHeight);
};
