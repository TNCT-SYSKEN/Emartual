// Socket.IOコネクション
var socket = io.connect(location.href);

// ウィンドウリサイズ対応
$(window).resize(Normal_View.resizeContainer);
window.onorientationchange = Normal_View.resizeContainer;

// 即時関数
(function(){
  // 初期join
  let join_room = "normal";

  socket.emit('init_upload', {
    'category': join_room
  });
})();

$('#submit').click(function (){
  // 入力されたテキスト
  var upload_text = addNewLine($("#uploadtext").val());
  // 選択されたタグ
  var upload_tag = removeSpace($("input#tag-select").val());
  var upload_position = CalcPosition(upload_text, $("#graphic-form").val(), upload_tag);

  // エラー表示の初期化
  $("#uploadtext").parent().removeClass('has-error');
  $("#uploadtext").next().remove();
  $("input#tag-select").parent().removeClass('has-error');
  $("input#tag-select").next().remove();

  // formのtext, tagが空行かの検出
  if(isBlankLine(upload_text)){
    $("#uploadtext").parent().addClass('has-error');
    $("#uploadtext").after($("<span>").addClass('control-label').text("空行では送信できません"));
  }
  else if(isBlankLine($("input#tag-select").val())){
    $("input#tag-select").parent().addClass('has-error');
    $("input#tag-select").after($("<span>").addClass('control-label').text("空行では送信できません"));
  }
  else{
    //新規タグ判定用
    var isnewtag = true;

    for(var i = 0; i < tag_data.length; ++i){
      if(tag_data[i].tag == upload_tag){
        isnewtag = false;
      }
    }

    // データのemit
    socket.emit('upload', {
      "data": {
        "text": upload_text,
        "form": $("#graphic-form").val(),
        "position": upload_position,
        "tag": upload_tag,
        "link": "",
        "date": new Date()
      },
      "isnewtag": isnewtag
    });

    // 投稿フォーム非表示
    $('.form').fadeOut("fast");

    // 追加予定のオブジェクトに移動
    moveObjectPosition({
      "x": -1 * upload_position.x + renderer.width / 2,
      "y": -1 * upload_position.y + renderer.height / 2
    });
  }
});

$('#post').click(function (){
  // 入力要素の初期化
  $('#uploadtext').val('');
  $('input#tag-select').val('');
  // エラー表示の初期化
  $("#uploadtext").parent().removeClass('has-error');
  $("#uploadtext").next().remove();
  $("input#tag-select").parent().removeClass('has-error');
  $("input#tag-select").next().remove();
  // 制限入力文字数表示の初期化
  $('#uploadtext-limit').text(100);

  // 投稿フォーム表示
  $('.form').draggable();
  $('.form').fadeIn("fast");

  // #uploadtextに対するフォーカス
  $('#uploadtext').focus();
});

$('#form_remove').click(function (){
  // 投稿フォーム非表示
  $('.form').fadeOut("fast");
});

$('#reload').click(function (){
  Normal_View.DrawObject();

  Normal_View.moveObjectPosition({
    "x": (-1 * position_limit.x_max + Field.renderer.width) / 2,
    "y": (-1 * (position_limit.y_max + position_limit.y_min) + Field.renderer.height) / 2
  });

  
});

$('#uploadtext').keyup(function(){
  $('#uploadtext-limit').text(100 - $('#uploadtext').val().length);
});

// カテゴリテストプログラム
$("#category-test").click(function(){
  Category.set_name("conversation");

  // 前オブジェクトの全削除
  Normal.clear_data();
  Normal_Tag.clear_data();
  Normal_View.clearObject();

  socket.emit("request_category", {
    "category": Category.get_name()
  });
});

// Conversationデータ保持の要素を作るべき
socket.on("response_category", function(init){
  for(let item of init.data){
    Conversation.add_data(item);
  }

  Conversation_View.CreateSpecialObject({text: "ほげほげ"});

  for(let item of Conversation.list){
    Conversation_View.CreateObject(item.data);
  }

  Conversation_View.DrawObject();
});

socket.on('init_update', function(init){
    for(let tag of init.tag){
      Normal_Tag(tag);
    }

    for(let item of init.data){
      Normal.add_data(item);
    }

    for(let item of Normal.list){
      Normal_View.CreateObject(item.data);
    }

    Normal_View.DrawObject();

  // カテゴリ名登録
  let defalut_category = 'normal';
  Category.set_name(defalut_category);
});

socket.on('update', function(update){
  Normal_Tag.add_data(update.tag);

  Normal.add_data(update.data);

  Normal_View.CreateObject(update.data);
  Normal_View.DrawObject();

  if( update.data.position.x > position_limit.x_max){
    position_limit.x_max = update.data.position.x;
  }
  if( update.data.position.y > position_limit.y_max){
    position_limit.y_max = update.data.position.y;
  }
  else if( update.data.position.y < position_limit.y_min){
    position_limit.y_min = update.data.position.y;
  }
});

var position_limit = null;

socket.on('position_limit', function(position){
  if(position_limit === null){
    position_limit = position;

    // objectの初期描画位置の変更
    Normal_View.moveObjectPosition({
      "x": (-1 * position_limit.x_max + Field.renderer.width) / 2,
      "y": (-1 * (position_limit.y_max + position_limit.y_min) + Field.renderer.height) / 2
    });
  }
});
