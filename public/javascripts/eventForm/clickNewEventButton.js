function countByte(obj) {
  let str = obj.value;
  let str_len = str.length;

  let bytesWritten = 0;
  let one_char = '';

  for (let i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (encodeURI(one_char).length > 4) {
      bytesWritten += 3;
    } else {
      bytesWritten++;
    }
  }
  return bytesWritten;
}

function checkByte(inputId, maxByte) {
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

function checkTime(inputId, str) {
  const input = document.getElementById(inputId);
  let ret = true;

  if (input.value === '') {
    input.setCustomValidity(str + '시간을 선택해주세요');
    ret = false;
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
  return ret;
}

function clickNewEventButton() {
  const formData = new FormData(document.querySelector('.form'));

  if (
    checkByte('event-title', 6) &&
    checkByte('event-pic', 6) &&
    checkTime('event-beginat', '시작') &&
    checkTime('event-endat', '종료') &&
    checkByte('event-location', 6) &&
    checkByte('event-topic', 6) &&
    checkByte('event-details', 6)
  ) {
    axios
      .post('/event/new', formData)
      .then(res => {
        alert('이벤트 등록이 완료되었습니다.');
        window.location.replace('/');
        //insertEventController.js안의 res.redirect('/')와 중복...?
      })
      .catch(err => alert(err.response.data.message));
  }
}

const newEventButton = document.querySelector('.form-button-new');
newEventButton.addEventListener('click', clickNewEventButton);
