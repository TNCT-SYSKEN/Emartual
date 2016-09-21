module.exports.send_Files = function(app){
  app.get('/js/app.js', function(req, res){
    res.sendFile(__dirname + "/views/js/app.js");
  });

  app.get('/css/app.css', function(req, res){
    res.sendFile(__dirname + "/views/css/app.css");
  });
};
