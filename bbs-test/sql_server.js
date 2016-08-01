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
  var sql_select = "select maintext, date_format(created, '%Y/%c/%e %T') as created from users;";
  var sql_insert = "";

  //bbsリクエストハンドラ取得時
  app.get('/bbs/', function(req, res){
    // クエリの作成
    sqlclient.query(sql_select, function(err, results, fields){
      if(err){
        throw err;
      }
    //ejs側に送信
    res.render('bbs.ejs', {send_data: results});
    });
  });

  app.post('/bbs/', function(req, res){
    if(req.body.maintext.match(/^[ 　\r\n\t]*$/)){
    }
    else{
      sqlclient.query("insert into users (maintext, created) value ('"+ req.body.maintext +"', now());", function(err, results, fields){
        if(err){
          throw err;
        }
      });
    }
      sqlclient.query(sql_select, function(err, results, fields){
        if(err){
          throw err;
        }
        //ejs側に送信
        res.render('bbs.ejs', {send_data: results});
      });
  });
};
