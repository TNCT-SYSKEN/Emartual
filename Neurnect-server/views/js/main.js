// 定数作成
const RENDERER_STYLE = {antialias: true, backgroundColor: 0xf7f7f7};
const ELLIPSE = "ellipse";
const RECT = "rect";
const AD = "advertisement";
const NORMAL = "normal";
const CONVERSATION = "conversation";

// main
(function(){
  new Normal();
  new Conversation();
  Field($('#container'));
})();
