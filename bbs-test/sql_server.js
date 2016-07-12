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
  // クエリの作成
  sqlclient.query("select * from users", function(err, results, fields){
    if(err){
      throw err;
    }
    app.get('/name/', function(req, res){
      var names = [];
      for(var i in results){
        //res.send(results[i].name);
      }
      res.send(results[0].name + "<br>" + results[0].email + "<br>" + results[0].maintext);
    });
  });
};
