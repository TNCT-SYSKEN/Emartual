exports.mainUI = function(app){
  app.get('/', function(req, res){
    res.render('main.ejs',{
      text: "Hello, good-bye"
    });
  });
};
