import { colorizeBorder } from './colorizeBorder.js';

// 1970 < 시작시간, 종료시간 < 4242
function checkMinMaxTime(time) {
  const min = new Date('1970-01-01T00:00');
  const max = new Date('4242-12-31T23:59');
  const timeObj = new Date(time);

  if (timeObj >= min && timeObj <= max) {
    return true;
  }
  return false;
}

function checkTimeOrder(beginat, endat) {
  if (endat === '' || beginat === '') return false;

  const beginatTime = new Date(beginat);
  const endatTime = new Date(endat);
  if (beginatTime <= endatTime) {
    return true;
  }
  return false;
}

function checkBeginatAndColorizeBorder(beginat) {
  if (beginat.value === '' || !checkMinMaxTime(beginat.value)) colorizeBorder(false, beginat);
  else colorizeBorder(true, beginat);
}

function checkEndatAndColorizeBorder(beginat, endat) {
  if (
    endat.value === '' ||
    !checkMinMaxTime(endat.value) ||
    !checkTimeOrder(beginat.value, endat.value)
  )
    colorizeBorder(false, endat);
  else colorizeBorder(true, endat);
}

export default function addTimeEventListener() {
  const beginat = document.getElementById('event-beginat');
  const endat = document.getElementById('event-endat');

  //  date변경시, input의 유효성에 따라 테두리 색 변경 후, 2초후 원상복귀
  beginat.addEventListener('change', () => {
    checkBeginatAndColorizeBorder(beginat);
    setTimeout(() => {
      beginat.style.border = 'none';
    }, 2000);
  });

  endat.addEventListener('change', () => {
    checkEndatAndColorizeBorder(beginat, endat);
    setTimeout(() => {
      endat.style.border = 'none';
    }, 2000);
  });

  // 이벤트 생성 버튼 입력했을 때, input이 유효하지 않으면, 테두리 색 변경
  beginat.addEventListener('invalid', () => {
    colorizeBorder(false, beginat);
  });

  endat.addEventListener('invalid', () => {
    colorizeBorder(false, endat);
  });

  // input에 포커스가 없어지면, 1초후 테두리 원상복귀
  beginat.addEventListener('blur', () => {
    if (beginat.style.border === '2px solid red')
      setTimeout(() => {
        beginat.style.border = 'none';
      }, 1000);
  });

  endat.addEventListener('blur', () => {
    if (endat.style.border === '2px solid red')
      setTimeout(() => {
        endat.style.border = 'none';
      }, 1000);
  });
}
