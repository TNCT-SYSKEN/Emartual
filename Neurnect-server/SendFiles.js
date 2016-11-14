module.exports.send_Files = function(app){
  app.get('/js/typical.js', function(req, res){
    res.sendFile(__dirname + "/views/js/typical.js");
  });

  app.get('/js/model.normal.js', function(req, res){
    res.sendFile(__dirname + "/views/js/model.normal.js");
  });

  app.get('/js/view.field.js', function(req, res){
    res.sendFile(__dirname + "/views/js/view.field.js");
  });

  app.get('/js/view.normal.object.js', function(req, res){
    res.sendFile(__dirname + "/views/js/view.normal.object.js");
  });

  app.get('/js/model.normal.tag.js', function(req, res){
    res.sendFile(__dirname + "/views/js/model.normal.tag.js");
  });

  app.get('/js/model.category.js', function(req, res){
    res.sendFile(__dirname + "/views/js/model.category.js");
  });

  app.get('/js/model.conversation.js', function(req, res){
    res.sendFile(__dirname + "/views/js/model.conversation.js");
  });

  app.get('/js/view.conversation.js', function(req, res){
    res.sendFile(__dirname + "/views/js/view.conversation.js");
  });

  app.get('/js/event.js', function(req, res){
    res.sendFile(__dirname + "/views/js/event.js");
  });

  app.get('/css/app.css', function(req, res){
    res.sendFile(__dirname + "/views/css/app.css");
  });

  app.get('/js/main.js', function(req, res){
    res.sendFile(__dirname + "/views/js/main.js");
  });
};
