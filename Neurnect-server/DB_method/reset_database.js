module.exports.dbreset = function(){
  var Posted_data = this.mongoose.model('Posted_data');

  Posted_data.find({}, function(err){
    if(err){console.log(err);}
  }).remove(function(){
    var prepost_data = [
    {
      "text": "Hello, Neurnect",
      "form": "ellipse",
      "position": {"x": 50, "y": 50},
      "category": "normal",
      "tag": "hoge"
    },
    {
      "text": "Neurnectの世界へようこそ",
      "form": "rect",
      "position": {"x": 200, "y": 200},
      "category": "normal",
      "tag": "hoge"
    },
    {
      "text": "別タグを表示します",
      "form" : "ellipse",
      "position": {"x": 500, "y" : 500},
      "category": "normal",
      "tag": "fuga"
    }];

    for (var i = 0; i < prepost_data.length; i++){
      var posted_data = new Posted_data(prepost_data[i]);
      posted_data.save(function(err){
        if(err){console.log(err);}
      })
    }
  }).exec();
};
