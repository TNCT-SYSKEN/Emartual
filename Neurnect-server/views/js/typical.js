// 引数が空行のみで構成されている場合にTrue
function isBlankLine(data){
  if(update_data.tag.match(/^[ 　\r\n\t]*$/)){
    return true;
  }
  else{
    return false;
  }
}
