// コンストラクタ
function Field($container){
  // レンダラの作成とDOM操作での要素追加
  this.renderer = new PIXI.autoDetectRenderer($('#container').width(), window.innerHeight, RENDERER_STYLE);
  $container.append(this.renderer.view);

  // ルートコンテナの作成
  this.stage = new PIXI.Container();
}

// プロパティ(データを保持しているので良くない)
Field.renderer;
Field.stage;
