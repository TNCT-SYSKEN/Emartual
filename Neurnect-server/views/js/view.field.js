// コンストラクタ
function Field($container){
  // レンダラの作成とDOM操作での要素追加
  Field.renderer = new PIXI.autoDetectRenderer($container.width(), window.innerHeight, RENDERER_STYLE);
  $container.append(Field.renderer.view);

  // ルートコンテナの作成
  Field.stage = new PIXI.Container();
}

// プロパティ(データを保持しているので良くない)
Field.renderer = null;
Field.stage = null;
