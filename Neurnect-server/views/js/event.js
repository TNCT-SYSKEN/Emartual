// Socket.IOコネクション
var socket = io.connect('http://localhost:1337/');

$('form').submit(function (e){
  // formのsubmit時のページ遷移停止
  e.preventDefault();

    // formのtext, tagが空行かの検出
    if(isBlankLine($("input#uploadtext").val())){

    }
    else if(isBlankLine($("input#tag-select").val())){

    }
    else{
      // データのemit
      socket.emit('upload_data', {
        "text": $("input#uploadtext").val(),
        "form": $("#graphic-form").val(),
        "position": CalcPosition($("input#uploadtext").val(), $("#graphic-form").val(), $("input#tag-select").val()),
        "tag": $("input#tag-select").val(),
        "link": "",
        "date": new Date()
      });

      // 投稿フォーム非表示
      $('.form').fadeOut("fast");
    }
});

$('#post').click(function (){
  // 入力要素の初期化
  $('input#uploadtext').val('');
  $('input#tag-select').val('');

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

$('#graphic-form').change(function (){
  var str = $(this).val();

  // 投稿フォーム後ろの変更をしたい
  console.log(str);
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
