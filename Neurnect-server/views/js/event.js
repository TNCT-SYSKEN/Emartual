// Socket.IOコネクション
var socket = io.connect('http://localhost:1337/');

$('#submit').click(function (){
  // 選択されたタグ
  var upload_tag = $("input#tag-select").val();

  // エラー表示の初期化
  $("input#uploadtext").parent().removeClass('has-error');
  $("input#uploadtext").next().remove();
  $("input#tag-select").parent().removeClass('has-error');
  $("input#tag-select").next().remove();

  // formのtext, tagが空行かの検出
  if(isBlankLine($("input#uploadtext").val())){
    $("input#uploadtext").parent().addClass('has-error');
    $("input#uploadtext").after($("<span>").addClass('control-label').text("空行では送信できません"));
  }
  else if(isBlankLine($("input#tag-select").val())){
    $("input#tag-select").parent().addClass('has-error');
    $("input#tag-select").after($("<span>").addClass('control-label').text("空行では送信できません"));
  }
  else{
    // データのemit
    socket.emit('upload_data', {
      "text": $("input#uploadtext").val(),
      "form": $("#graphic-form").val(),
      "position": CalcPosition($("input#uploadtext").val(), $("#graphic-form").val(), removeSpace(upload_tag)),
      "tag": removeSpace(upload_tag),
      "link": "",
      "date": new Date()
    });

    //新規タグ判定用
    var istag = false;

    for(var i = 0; i < tag_data.length; ++i){
        if(tag_data[i].tag == upload_tag){
          tagcheck = true;
        }
    }

    if(! tagcheck){socket.emit('upload_tag', {"tag": upload_tag});}

    // 投稿フォーム非表示
    $('.form').fadeOut("fast");
  }
});

$('#post').click(function (){
  // 入力要素の初期化
  $('input#uploadtext').val('');
  $('input#tag-select').val('');
  // エラー表示の初期化
  $("input#uploadtext").parent().removeClass('has-error');
  $("input#uploadtext").next().remove();
  $("input#tag-select").parent().removeClass('has-error');
  $("input#tag-select").next().remove();

  // 投稿フォーム表示
  $('.form').draggable();
  $('.form').fadeIn("fast");

  // #uploadtextに対するフォーカス
  $('input#uploadtext').focus();
});

$('#form_remove').click(function (){
  // 投稿フォーム非表示
  $('.form').fadeOut("fast");
});

$('#reload').click(function (){
  var data = {
    "text": "ほげほげ",
    "form": "rect",
    "tag": "fuga"
  };

  data.position = CalcPosition(data.text, data.form, data.tag);

  CreateObject(data);

  DrawObject();
});


$('#debug-btn').click(function(){
  $(this).parent().addClass('has-error');
});

$('#graphic-form').change(function (){
  var str = $(this).val();

  // 投稿フォーム後ろの変更をしたい
  console.log(str);
});

var tag_data = null;

socket.on('init_tag', function(init_tag) {
  tag_data = init_tag;
});

let init_isfirst = false;

socket.on('init_data', function(init_data){
  if(! init_isfirst){
    for(let item of init_data){
      CreateObject(item);
    }
    DrawObject();

    init_isfirst = true;
  }
});

socket.on('update_data', function(update_data){
    CreateObject(update_data);
    DrawObject();
});

let tag_item = null;

socket.on('init_tag', function(init_tag) {
  tag_item = init_tag;
});
