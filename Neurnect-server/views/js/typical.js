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
