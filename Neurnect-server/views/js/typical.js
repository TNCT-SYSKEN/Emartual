// 引数が空行のみで構成されている場合にTrue
function isBlankLine(data){
  if(data.match(/^[ 　\r\n\t]*$/)){
    return true;
  }
  else{
    return false;
  }
}

// 引数の空白を潰して返す
function removeSpace(data){
  return data.replace(/ /g, "").replace(/　/g, "");
}

// 20文字ごとに改行を挿入
// 20文字以内に改行があれば挿入されない
function addNewLine(data){
  var lines = data.split("\n");
  var after_data = '';

  for(var i = 0; i < lines.length; i++){
    after_data += lines[i].replace(/(.{20})/g, "$1\n");
    if(i + 1 < lines.length){
      after_data += "\n";
    }
  }

  // 末尾の改行削除
  return after_data.replace(/\n+$/g,'');
}
