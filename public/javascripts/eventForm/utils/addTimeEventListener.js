import { colorizeBorder } from './colorizeBorder.js';

// 1970 < 시작시간, 종료시간 < 4242
function checkMinMaxTime(time) {
  const min = new Date('1970-01-01T00:00');
  const max = new Date('4242-12-31T23:59');
  const timeObj = new Date(time);

  if (timeObj >= min && timeObj <= max) return true;
  return false;
}

function checkTimeOrder(beginAt, endAt) {
  if (endAt === '' || beginAt === '') return false;

  const beginAtTime = new Date(beginAt);
  const endAtTime = new Date(endAt);
  if (beginAtTime <= endAtTime) return true;
  return false;
}

function checkBeginAtAndColorizeBorder(beginAt) {
  if (beginAt.value === '' || !checkMinMaxTime(beginAt.value)) colorizeBorder(false, beginAt);
  else colorizeBorder(true, beginAt);
}

function checkEndAtAndColorizeBorder(beginAt, endAt) {
  if (
    endAt.value === '' ||
    !checkMinMaxTime(endAt.value) ||
    !checkTimeOrder(beginAt.value, endAt.value)
  )
    colorizeBorder(false, endAt);
  else colorizeBorder(true, endAt);
}

export default function addTimeEventListener() {
  const beginAt = document.getElementById('event-beginat');
  const endAt = document.getElementById('event-endat');

  //  date변경시, input의 유효성에 따라 테두리 색 변경
  beginAt.addEventListener('change', () => {
    checkBeginAtAndColorizeBorder(beginAt);
    setTimeout(() => {
      beginAt.style.border = 'none';
    }, 2000);
  });

  endAt.addEventListener('change', () => {
    checkEndAtAndColorizeBorder(beginAt, endAt);
    setTimeout(() => {
      endAt.style.border = 'none';
    }, 2000);
  });

  // 이벤트 생성 버튼 클릭시, 테두리 색 변경
  beginAt.addEventListener('invalid', () => {
    colorizeBorder(false, beginAt);
  });

  endAt.addEventListener('invalid', () => {
    colorizeBorder(false, endAt);
  });

  // input에 포커스가 없어지면, 1초동안 테두리색 변경
  beginAt.addEventListener('blur', () => {
    if (beginAt.style.border === '2px solid red')
      setTimeout(() => {
        beginAt.style.border = 'none';
      }, 1000);
  });

  endAt.addEventListener('blur', () => {
    if (endAt.style.border === '2px solid red')
      setTimeout(() => {
        endAt.style.border = 'none';
      }, 1000);
  });
}
