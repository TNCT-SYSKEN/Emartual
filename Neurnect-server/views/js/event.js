// Socket.IOコネクション
var socket = io.connect('http://localhost:1337/');

$('form').submit(function (e){
  // formのsubmit時のページ遷移停止
  e.preventDefault();

  // データのemit
  socket.emit('upload_data', {
    "text": $("input#uploadtext").val(),
    "form": $("#graphic-form").val(),
    "position": CalcPosition($("input#uploadtext").val(), $("#graphic-form").val(), $("input#tag-select").val()),
    "tag": $("input#tag-select").val(),
    "link": "",
    "date": new Date()
  });

  var upload_tag = $("input#tag-select").val();
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
  if(update_data.text.match(/^[ 　\r\n\t]*$/)){

  }
  if(update_data.tag.match(/^[ 　\r\n\t]*$/)){

  }
    CreateObject(update_data);
    DrawObject();
});
