var express = require('express');
var app = express();
var ejs = require('ejs');

var setting = require("./setting.js");
var mainUI = require("./mainUI.js");

app.engine('ejs', ejs.renderFile);

mainUI.mainUI(app); //mainUIの情報を受け取る

app.post('/js/app.js', function(req, res){
  res.sendFile(__dirname + "/views/js/app.js");
});

app.listen(setting.port, setting.host, function(){
  console.log("server listening...  " + setting.host + ":" + setting.port);
});
