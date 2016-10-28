// コンストラクタ
function Field($container){
  Field.$container = $container;
  // レンダラの作成とDOM操作での要素追加
  Field.renderer = new PIXI.autoDetectRenderer(Field.$container.width(), window.innerHeight, RENDERER_STYLE);
  $container.append(Field.renderer.view);

  // ルートコンテナの作成
  Field.stage = new PIXI.Container();
}

// プロパティ(データを保持しているので良くない)
Field.$container = null;
Field.renderer = null;
Field.stage = null;
