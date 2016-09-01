var express = require('express');
var app = express();
var ejs = require('ejs');

var setting = require("./setting.js");

app.engine('ejs', ejs.renderFile);

app.get('/', function(req, res){
  res.render('main.ejs',{
    text: "hagahaga"
  });
});

app.get('/js/app.js', function(req, res){
  res.sendFile(__dirname + "/views/js/app.js");
});

app.listen(setting.port, setting.host, function(){
  console.log("server listening...  " +setting.host + ":" + setting.port);
});
