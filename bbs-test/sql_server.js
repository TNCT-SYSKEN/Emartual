// MySQLへの接続
exports.sql_connect = function(sqlclient){
  sqlclient.connect(function(err){
    if(err){
      throw err;
    }
    console.log('connected as id ' + sqlclient.threadId);
    //callback(sqlclient);
  });
  return sqlclient;
};

exports.name_query = function(sqlclient, app){
  // nameフィールドを取得するクエリの作成
  var sql_command = "select maintext, date_format(created, '%Y/%c/%e %T') as created from users;";
  // クエリの作成
  sqlclient.query(sql_command, function(err, results, fields){
    if(err){
      throw err;
    }
    app.get('/name/', function(req, res){
      //ejs側に送信
      res.render('bbs.ejs', {send_data: results});
    });
  });
};
