function checkByte(obj, maxByte) {
  let str = obj.value;
  let str_len = str.length;

  let bytesWritten = 0;
  let charWritten = 0;
  let one_char = '';
  let str2 = '';

  for (let i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      bytesWritten += 2;
    } else {
      bytesWritten++;
    }
    if (bytesWritten <= maxByte) {
      charWritten = i + 1; //return할 문자열 갯수
    }
  }
  if (bytesWritten > maxByte) {
    //alert('메세지는 최대 ' + maxByte + 'byte를 초과할 수 없습니다.');
    str2 = str.substr(0, charWritten); //문자열 자르기
    obj.value = str2;
    checkByte(obj, maxByte);
  }
}
