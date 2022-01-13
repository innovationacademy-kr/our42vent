function cutByte(obj, maxByte) {
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
    str2 = str.substr(0, charWritten); //문자열 자르기
    obj.value = str2;
  }
}

// function checkByte(inputId, maxByte) {
// }

const inputObject = document.getElementById('event-title');
// inputObject.addEventListener('keyup', cutByte(inputObject, 6));
console.log(inputObject);
inputObject.addEventListener('click', () => cutByte(inputObject, 6));

// checkByte('event-title', 6); //256
// checkByte('event-pic', 6); //64
// checkByte('event-location', 6); //256
// checkByte('event-topic', 6); //512
// checkByte('event-details', 6); //4096
