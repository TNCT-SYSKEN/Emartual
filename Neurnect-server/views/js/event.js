// Socket.IOコネクション
var socket = io.connect(location.href);

// ウィンドウリサイズ対応
$(window).resize(Normal_View.resizeContainer);
window.onorientationchange = Normal_View.resizeContainer;

// 即時関数
(function(){
  $(document).on("keypress", "input:not(.allow_submit)",function(event){
    return event.which !== 13;
  });
  // 初期join
  Category.set_name("normal");

  socket.emit('init_upload', {
    'category': Category.get_name()
  });
})();

$('#submit').click(function (){
  // 入力されたテキスト
  var upload_text = Typical.addNewLine($("#uploadtext").val());
  // 選択されたタグ
  var upload_tag = Typical.removeSpace($("input#tag-select").val());
  // 配置
  var upload_position = null;

  if(Category.get_name() == NORMAL){
    upload_position = Normal_View.CalcPosition(upload_text, $("#graphic-form").val(), upload_tag);
  }
  // TODO: 要修正
  else if(Category.get_name() == CONVERSATION){
    upload_position = Conversation_View.CalcPosition(upload_text, "ellipse");
  }

  // エラー表示の初期化
  $("#uploadtext").attr('placeholder', 'メインテキスト');
  $("#uploadtext").removeClass('error');
  $("input#tag-select").attr('placeholder', 'タグ');
  $("input#tag-select").removeClass('error');

  // formのtext, tagが空行かの検出
  if(Typical.isBlankLine(upload_tag)){
    $("input#tag-select").attr('placeholder', 'タグを入力してください');
    $("input#tag-select").addClass("error");
  }
  else if(Typical.isBlankLine(upload_text)){
    $("#uploadtext").attr('placeholder', 'テキストを入力してください');
    $("#uploadtext").addClass('error');
  }
  else{
    //新規タグ判定用
    var isnewtag = true;

    for(var i = 0; i < Normal_Tag.list.length; ++i){
      if(Normal_Tag.list[i].tag == upload_tag){
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
        "category": Category.get_name(),
        "link": "",
        "date": new Date()
      },
      "isnewtag": isnewtag
    });

    // 投稿フォーム非表示
    $('.form').fadeOut("fast");

    // 追加予定のオブジェクトに移動
    Normal_View.moveObjectPosition({
      "x": -1 * upload_position.x + Field.renderer.width / 2,
      "y": -1 * upload_position.y + Field.renderer.height / 2
    });

    // 入力要素の初期化
    $('#uploadtext').val('');
    $('#tag-select').val('');
  }
});

$('#reload').click(function (){
  if(Category.get_name() == NORMAL){
    Normal_View.DrawObject();

    Normal_View.moveObjectPosition({
      "x": (-1 * Normal.position_limit.x_max + Field.renderer.width) / 2,
      "y": (-1 * (Normal.position_limit.y_max + Normal.position_limit.y_min) + Field.renderer.height) / 2
    });
  }
  else if(Category.get_name() == CONVERSATION){
    Conversation_View.DrawObject();

    // TODO: 要修正
    Conversation_View.moveObjectPosition({
      "x": Field.renderer.width / 2,
      "y": Field.renderer.height / 2
    });
  }
});

$('#uploadtext').keyup(function(){
  $('#uploadtext-limit').text(100 - $('#uploadtext').val().length);
});

// カテゴリテストプログラム
$("#switch-conversation").click(function(){
  Category.set_name("conversation");

  // 前オブジェクトの全削除
  Normal.clear_data();
  Normal_Tag.clear_data();
  Normal_View.clearObject();

  $("#this-category").text('conversation');
  $("#remaining-time").removeClass('hidden');
  socket.emit("request_category", {
    "category": Category.get_name()
  });
});

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
  if(update.data.category == NORMAL){
    Normal_Tag(update.tag);

    Normal.add_data(update.data);

    Normal_View.CreateObject(update.data);
    Normal_View.DrawObject();

    if( update.data.position.x > Normal.position_limit.x_max){
      Normal.position_limit.x_max = update.data.position.x;
    }
    if( update.data.position.y > Normal.position_limit.y_max){
      Normal.position_limit.y_max = update.data.position.y;
    }
    else if( update.data.position.y < Normal.position_limit.y_min){
      Normal.position_limit.y_min = update.data.position.y;
    }
  }
  else if(update.data.category == CONVERSATION){
    Conversation.add_data(update);
    Conversation_View.CreateObject(update.data);
    Conversation_View.DrawObject();
  }
});

socket.on('position_limit', function(position){
  Normal.position_limit = position;

  // objectの初期描画位置の変更
  Normal_View.moveObjectPosition({
    "x": (-1 * Normal.position_limit.x_max + Field.renderer.width) / 2,
    "y": (-1 * (Normal.position_limit.y_max + Normal.position_limit.y_min) + Field.renderer.height) / 2
  });
});
