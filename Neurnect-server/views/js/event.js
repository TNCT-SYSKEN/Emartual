// Socket.IOコネクション
var socket = io.connect('http://localhost:1337/');

// ウィンドウリサイズ対応
$(window).resize(resizeContainer)
window.onorientationchange = resizeContainer;

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
    // データのemit
    socket.emit('upload_data', {
      "text": upload_text,
      "form": $("#graphic-form").val(),
      "position": upload_position,
      "tag": upload_tag,
      "link": "",
      "date": new Date()
    });

    if( upload_position.x > position_limit.x_max){
      position_limit.x_max = upload_position.x;
    }
    if( upload_position.y > position_limit.y_max){
      position_limit.y_max = upload_position.y;
    }
    if( upload_position.y < position_limit.y_min){
      position_limit.y_min = upload_position.y;
    }

    //新規タグ判定用
    var istag = false;

    for(var i = 0; i < tag_data.length; ++i){
        if(tag_data[i].tag == upload_tag){
          istag = true;
        }
    }

    if(! istag){
      socket.emit('upload_tag', {"tag": upload_tag});
    }

    // 投稿フォーム非表示
    $('.form').fadeOut("fast");

    console.log(upload_position.x);
    console.log(upload_position.y);

    // 追加予定のオブジェクトに移動
    moveObjectPosition({
      "x":  -1 * upload_position.x + renderer.width / 2,
      "y": upload_position.y + renderer.height / 2
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
  DrawObject();
});

$('#debug-btn').click(function(){
  moveObjectPosition({
    "x": Math.floor(position_limit.x_max / 2),
    "y": (-1 * (position_limit.y_max + position_limit.y_min) + renderer.height) / 2
  });
});

$('#graphic-form').change(function (){
  var str = $(this).val();

  // 投稿フォーム後ろの変更をしたい
  console.log(str);
});

$('#uploadtext').keyup(function(){
  $('#uploadtext-limit').text(100 - $('#uploadtext').val().length);
});

// タグ名と色の対応
let tag_data = null;

// debug用
tag_data = [
  {
    "tag": "hoge",
    "color": 0x4661df
  },
  {
    "tag": "fuga",
    "color": 0xe3cc04
  },
  {
    "tag": "piyo",
    "color": 0x5a5a5a
  }
];

socket.on('update_tag', function(update_tag) {
  console.log(update_tag);
  tag_data.push(update_tag);
});

// 初回送信であるかの判定用
let init_data_isfirst = false;
let init_tag_isfirst = false;

socket.on('init_data', function(init_data){
  if(! init_data_isfirst){
    for(let item of init_data){
      CreateObject(item);
    }
    DrawObject();

    console.log("最初" + (-1 * (position_limit.y_max + position_limit.y_min) + renderer.height) / 2);

    // objectの初期描画位置の変更
    moveObjectPosition({
      "x": (-1 * position_limit.x_max + renderer.width) / 2,
      "y": (-1 * (position_limit.y_max + position_limit.y_min) + renderer.height) / 2
    });
  }
  init_data_isfirst = true;
});

socket.on('init_tag', function(init_tag) {
  console.log(init_tag);
  if(! init_tag_isfirst){
    tag_data = init_tag;
  }
  init_tag_isfirst = true;
});

socket.on('update_data', function(update_data){
    CreateObject(update_data);
    DrawObject();
});

var position_limit = null;
// debug用
position_limit = {
  "x_max": 2000,
  "y_max": 500,
  "y_min": 50
};

socket.on('position_limit', function(position){
  position_limit = position;
});
