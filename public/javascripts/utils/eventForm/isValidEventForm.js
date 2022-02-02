import countByte from './countByte.js';

function findMaxByte(inputId) {
  let maxByte;

  switch (inputId) {
    case 'event-title':
    case 'event-location':
      maxByte = 224;
      break;
    case 'event-pic':
      maxByte = 56;
      break;
    case 'event-topic':
      maxByte = 480;
      break;
    default:
      maxByte = 4064;
      break;
  }
  return maxByte;
}

// 빈칸이거나 제한바이트 초과할 경우, 해당 에러 메세지를 띄우고 false 반환
function checkTextValidity(inputId) {
  const maxByte = findMaxByte(inputId);
  const input = document.getElementById(inputId);
  const bytesCount = countByte(input.value);
  let ret = true;

  if (inputId !== 'event-pic' && inputId !== 'event-details' && input.value === '') {
    input.setCustomValidity('비어있는 칸을 채워주세요');
    ret = false;
  } else if (bytesCount > maxByte) {
    input.setCustomValidity(
      `이 항목은 ${maxByte}byte를 초과할 수 없습니다. 현재 ${bytesCount}bytes 썼습니다.`
    );
    ret = false;
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
  return ret;
}

// 시작(종료)시간 입력여부와 기간내 시간인지 확인 후 true/false 반환
function checkTimeValidity(inputId) {
  const input = document.getElementById(inputId);
  const dateMin = new Date('1970-01-01T00:00');
  const dateMax = new Date('4242-12-31T23:59');
  const inputDate = new Date(input.value);
  const timeName = inputId === 'event-beginat' ? '시작' : '종료';
  let ret = true;

  if (input.value === '') {
    input.setCustomValidity(`${timeName} 시간을 선택해주세요`);
    ret = false;
  } else if (inputDate < dateMin || inputDate > dateMax) {
    input.setCustomValidity(`${timeName} 시간은 1970년부터 4242년 사이에서 선택해주세요`);
    ret = false;
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
  return ret;
}

// 시간 > 종료 제한
function checkTimeOrder() {
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

function checkCategoryValidity() {
  const category = document.getElementById('event-category');
  let ret = true;

  if (category.value === 'none') {
    category.setCustomValidity('카테고리를 선택해주세요');
    ret = false;
  } else {
    category.setCustomValidity('');
  }
  category.reportValidity();
  return ret;
}

export default function isValidEventForm() {
  return (
    checkTextValidity('event-title') &&
    checkTextValidity('event-pic') &&
    checkTimeValidity('event-beginat') &&
    checkTimeValidity('event-endat') &&
    checkTimeOrder() &&
    checkTextValidity('event-location') &&
    checkCategoryValidity() &&
    checkTextValidity('event-topic') &&
    checkTextValidity('event-details')
  );
}
