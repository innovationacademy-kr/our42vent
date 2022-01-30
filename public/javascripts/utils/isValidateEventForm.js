// 빈칸이거나 제한바이트 초과할 경우, 해당 메세지를 띄우고 false 반환
function checkByte(inputId, maxByte) {
  const input = document.getElementById(inputId);
  const newLineCnt = input.value.match(/\n/g) ? input.value.match(/\n/g).length : 0;
  const bytesCnt = new TextEncoder().encode(input.value).length + newLineCnt;
  let ret = true;

  if (inputId !== 'event-pic' && inputId !== 'event-details' && input.value === '') {
    input.setCustomValidity('비어있는 칸을 채워주세요');
    ret = false;
  } else if (bytesCnt > maxByte) {
    input.setCustomValidity(
      `이 항목은 ${maxByte}byte를 초과할 수 없습니다. 현재 ${bytesCnt}bytes 썼습니다.`
    );
    ret = false;
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
  return ret;
}

// 이벤트 시작시간/종료시간 입력여부 확인 후 true/false 반환
function checkTime(inputId, str) {
  const input = document.getElementById(inputId);
  let ret = true;
  const dateMin = new Date('1970-01-01T00:00');
  const dateMax = new Date('4242-12-31T23:59');
  const inputDate = new Date(input.value);

  if (input.value === '') {
    input.setCustomValidity(`${str} 시간을 선택해주세요`);
    ret = false;
  } else if (inputDate < dateMin || inputDate > dateMax) {
    input.setCustomValidity(`${str} 시간은 1970년부터 4242년 사이에서 선택해주세요`);
    ret = false;
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
  return ret;
}

// 시간 > 종료 제한
function compareTime() {
  const beginAtElment = document.getElementById('event-beginat');
  const endAtElement = document.getElementById('event-endat');
  const begin = new Date(beginAtElment.value);
  const end = new Date(endAtElement.value);
  let ret = true;

  if (begin > end) {
    endAtElement.setCustomValidity('종료시간은 시작시간 이후여야 합니다.');
    ret = false;
  } else {
    endAtElement.setCustomValidity('');
  }
  endAtElement.reportValidity();
  return ret;
}

export default function isValidateEventForm() {
  return (
    checkByte('event-title', 224) &&
    checkByte('event-pic', 56) &&
    compareTime() &&
    checkTime('event-beginat', '시작') &&
    checkTime('event-endat', '종료') &&
    checkByte('event-location', 224) &&
    checkByte('event-topic', 480) &&
    checkByte('event-details', 4064)
  );
}
