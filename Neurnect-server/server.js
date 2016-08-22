// モジュールの読み込み
var express = require('express'),
    SqlClient = require('mysql'),
    bodyParser = require('body-parser'),
    multer = require('multer');

// 設定の読み込み
var setting = require('./setting.js');

// MySQLへの接続
var sqlclient = SqlClient.createConnection({
  host:     'localhost',
  user:     setting.dbuser,
  password: setting.dbpasswd,
  database: setting.dbname
});

// サーバーアクセス用IP:ポートの表示
console.log(setting.host + ":" + setting.port);

// サーバークラスの新規作成
var app = express();

// テンプレートエンジンの設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// bodyParser(jsonのパース)の設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// '/'リクエストハンドラ
app.get('/', function(req, res){
  res.render('main.ejs', {
    text: 'Hello, Konva!'
  });
});

// サーバーのリスニング状態開始を表示
app.listen(setting.port, setting.host);
console.log('server listening ...');
