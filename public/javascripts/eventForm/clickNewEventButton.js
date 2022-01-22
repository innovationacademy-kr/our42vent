import { alertModal } from '../utils/sweetAlertMixin.js';
// 입력되는 문자열 byte 계산하여 반환
function countByte(str) {
  const strLen = str.length;

  let bytesWritten = 0;
  let oneChar = '';

  for (let i = 0; i < strLen; i += 1) {
    oneChar = str.charAt(i);
    if (encodeURI(oneChar).length > 4) {
      bytesWritten += 3;
    } else {
      bytesWritten += 1;
    }
  }
  return bytesWritten;
}

// 빈칸이거나 제한바이트 초과할 경우, 해당 메세지를 띄우고 false 반환
export function checkByte(inputId, maxByte) {
  const input = document.getElementById(inputId);
  const bytesWritten = countByte(input.value);
  let ret = true;

  if (inputId !== 'event-pic' && inputId !== 'event-details' && input.value === '') {
    input.setCustomValidity('비어있는 칸을 채워주세요');
    ret = false;
  } else if (bytesWritten > maxByte) {
    input.setCustomValidity(
      `이 항목은 ${maxByte}byte를 초과할 수 없습니다. 현재 ${bytesWritten}bytes 썼습니다.`
    );
    ret = false;
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
  return ret;
}

// 이벤트 시작시간/종료시간 입력여부 확인 후 true/false 반환
export function checkTime(inputId, str) {
  const input = document.getElementById(inputId);
  let ret = true;

  if (input.value === '') {
    input.setCustomValidity(`${str} 시간을 선택해주세요`);
    ret = false;
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
  return ret;
}

// 이벤트 생성 버튼 입력전, 모든 항목 입력 완료시 이벤트 생성 post 요청
function clickNewEventButton() {
  const formData = new FormData(document.querySelector('.form'));

  if (
    checkByte('event-title', 256) &&
    checkByte('event-pic', 64) &&
    checkTime('event-beginat', '시작') &&
    checkTime('event-endat', '종료') &&
    checkByte('event-location', 256) &&
    checkByte('event-topic', 512) &&
    checkByte('event-details', 4096)
  ) {
    axios
      .post('/event', formData)
      .then(() => {
        alertModal
          .fire({ title: '이벤트가 생성되었습니다.', icon: 'success' })
          .then(() => window.location.replace(window.location.pathname));
      })
      .catch(err => {
        alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' });
        console.log(err.stack);
      });
  }
}

const newEventButton = document.querySelector('.form-button-new');
newEventButton.addEventListener('click', clickNewEventButton);
