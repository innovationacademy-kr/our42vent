// 1970 < 시작시간, 종료시간 < 4242
function isValidTimeRange(time) {
  const min = new Date('1970-01-01T00:00');
  const max = new Date('4242-12-31T23:59');
  const timeObj = new Date(time);

  if (timeObj >= min && timeObj <= max) return true;
  return false;
}

function isValidTimeOrder() {
  const beginAt = document.getElementById('event-beginat').value;
  const endAt = document.getElementById('event-endat').value;
  const beginAtTime = new Date(beginAt);
  const endAtTime = new Date(endAt);

  if (beginAtTime <= endAtTime) return true;
  return false;
}

function colorizeTimeBorder(eleToColor, eleToCompare) {
  if (
    eleToColor.value !== '' &&
    isValidTimeRange(eleToColor.value) &&
    (eleToCompare.value === '' || isValidTimeOrder())
  )
    eleToColor.style.border = '2px solid green';
  else eleToColor.style.border = '2px solid red';
}

export default function addTimeEventListener() {
  const beginAt = document.getElementById('event-beginat');
  const endAt = document.getElementById('event-endat');

  //  date변경시, input의 유효성에 따라 테두리 색 변경
  beginAt.addEventListener('change', () => {
    colorizeTimeBorder(beginAt, endAt);
    setTimeout(() => {
      beginAt.style.border = 'none';
    }, 2000);
  });

  endAt.addEventListener('change', () => {
    colorizeTimeBorder(endAt, beginAt);
    setTimeout(() => {
      endAt.style.border = 'none';
    }, 2000);
  });

  // 이벤트 생성 버튼 클릭시, 테두리 색 변경
  beginAt.addEventListener('invalid', () => {
    colorizeTimeBorder(beginAt, endAt);
  });

  endAt.addEventListener('invalid', () => {
    colorizeTimeBorder(endAt, beginAt);
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
