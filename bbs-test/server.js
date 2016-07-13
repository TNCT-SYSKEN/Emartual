// モジュールの読み込み
var express = require('express'),
    SqlClient = require('mysql'),
    sql_server = require('./sql_server.js');

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

// サーバーの作成
var app = express();
sqlclient = sql_server.sql_connect(sqlclient);
//テンプレートエンジンの設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// クエリの送信
sql_server.name_query(sqlclient, app);

// '/'リクエストハンドラ
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// じぇじぇじぇ！リクエストハンドラ
app.get('/jejeje/', function(req, res){
  res.sendfile('jejeje.html');
});

app.listen(setting.port, setting.host);
console.log('server listening ...');
