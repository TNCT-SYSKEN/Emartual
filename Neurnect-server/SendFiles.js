module.exports.send_Files = function(app){
  app.get('/js/typical.js', function(req, res){
    res.sendFile(__dirname + "/views/js/typical.js");
  });

  app.get('/js/container.js', function(req, res){
    res.sendFile(__dirname + "/views/js/container.js");
  });

  app.get('/js/event.js', function(req, res){
    res.sendFile(__dirname + "/views/js/event.js");
  });

  app.get('/js/ngevent.js', function(req, res){
    res.sendFile(__dirname + "/views/js/ngevent.js");
  });

  app.get('/css/app.css', function(req, res){
    res.sendFile(__dirname + "/views/css/app.css");
  });
};
