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

  app.get('/image/Neurnect_logo.png', function(req, res){
    res.sendFile(__dirname + "/views/image/Neurnect_logo.png");
  });

  // frameworks
  app.get('/4.0.0/pixi.min.js', function(req, res){
    res.sendFile(__dirname + "/framework/pixi.min.js");
  });

  app.get('/jquery-2.2.4.min.js', function(req, res){
    res.sendFile(__dirname + "/framework/jquery-2.2.4.min.js");
  });

  app.get('/3.3.7/bootstrap.min.css', function(req, res){
    res.sendFile(__dirname + "/framework/bootstrap.min.css");
  });

  app.get('/3.3.7/bootstrap.min.js', function(req, res){
    res.sendFile(__dirname + "/framework/bootstrap.min.js");
  });

  app.get('/socket.io-1.4.8.js', function(req, res){
    res.sendFile(__dirname + "/framework/socket.io-1.4.8.js");
  });

  app.get('/4.7.0/css/font-awesome.min.css', function(req, res){
    res.sendFile(__dirname + "/framework/font-awesome.min.css");
  });

  app.get('/4.7.0/fonts/fontawesome-webfont.eot', function(req, res){
    res.sendFile(__dirname + "/framework/fonts/fontawesome-webfont.eot");
  });

  app.get('/4.7.0/fonts/fontawesome-webfont.svg', function(req, res){
    res.sendFile(__dirname + "/framework/fonts/fontawesome-webfont.svg");
  });

  app.get('/4.7.0/fonts/fontawesome-webfont.ttf', function(req, res){
    res.sendFile(__dirname + "/framework/fonts/fontawesome-webfont.ttf");
  });

  app.get('/4.7.0/fonts/fontawesome-webfont.woff', function(req, res){
    res.sendFile(__dirname + "/framework/fonts/fontawesome-webfont.woff");
  });

  app.get('/4.7.0/fonts/fontawesome-webfont.woff2', function(req, res){
    res.sendFile(__dirname + "/framework/fonts/fontawesome-webfont.woff2");
  });

  app.get('/4.7.0/fonts/FontAwesoke.otf', function(req, res){
    res.sendFile(__dirname + "/framework/fonts/FontAwesoke.otf");
  });
};
