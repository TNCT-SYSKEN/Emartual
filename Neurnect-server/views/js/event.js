// Socket.IOコネクション
var socket = io.connect('http://localhost:1337/');

$('form').submit(function (e){
  // formのsubmit時のページ遷移停止
  e.preventDefault();

  // データのemit
  socket.emit('upload_data', {
    "text": $("input#uploadtext").val(),
    "form": $("#graphic-form").val(),
    "image": "",
    "position": "",
    "category": "",
    "tag": $("input#tag").val(),
    "link": "",
    "date": new Date()
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
