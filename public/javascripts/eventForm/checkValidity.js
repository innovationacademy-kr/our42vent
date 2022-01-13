// const titleInput = document.getElementById('event-title');

// function checkValidity(inputId) {
//   const input = document.getElementById(inputId);

//   if (input.value === '') {
//     input.setCustomValidity('비어있는 칸을 채워주세요');
//   } else {
//     input.setCustomValidity('');
//   }

//   input.reportValidity();
// }

// titleInput.addEventListener('click', checkValidity('event-title'));

function countByte(obj) {
  let str = obj.value;
  let str_len = str.length;

  let bytesWritten = 0;
  let one_char = '';

  for (let i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      bytesWritten += 2;
    } else {
      bytesWritten++;
    }
  }
  return bytesWritten;
}

function customValidity(inputId, maxByte) {
  const input = document.getElementById(inputId);
  let bytesWritten = countByte(input);
  let ret = true;

  if (input.value === '') {
    input.setCustomValidity('비어있는 칸을 채워주세요');
    ret = false;
  } else if (bytesWritten > maxByte) {
    input.setCustomValidity(
      '이 항목은 ' + maxByte + 'byte를 초과할 수 없습니다. 현재 ' + bytesWritten + 'bytes 썼습니다.'
    );
    ret = false;
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
  return ret;
}

function checkAll() {
  customValidity('event-title', 6);
  customValidity('event-pic', 6);
  customValidity('event-location', 6);
  customValidity('event-topic', 6);
  customValidity('event-details', 6);
}

const inputObject = document.querySelector('.form-button-new');
inputObject.addEventListener('click', () => checkAll());
// inputObject.addEventListener('click', () => customValidity('event-pic', 6));
// inputObject.addEventListener('click', () => customValidity('event-location', 6));
// inputObject.addEventListener('click', () => customValidity('event-title', 6));

// function checkValidity(inputId, maxByte) {
//   const inputObject = document.getElementById(inputId);
//   inputObject.addEventListener('focus', () => customValidity(inputId, maxByte));
// }

// checkValidity('event-title', 2);
// checkValidity('event-pic', 2);
// checkValidity('event-location', 2);
// checkValidity('event-topic', 2);
// checkValidity('event-details', 2);
