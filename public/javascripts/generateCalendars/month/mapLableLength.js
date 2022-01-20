/**
 * 모든 이벤트 'id : { 띠지 길이, 다음행 점검 }' 형태로 담는 eventHash
 * eventHash 에 아직 표시해야하는 띠지 길이 업데이트
 * 이벤트 띠지 길이 (length) 설정
 */
export default function mapLabelLength(firstDate, dateIndex, eventArray, eventHash) {
  const newEventHash = eventHash;
  const boxHeight = document.querySelector('.month-date').offsetHeight - 20;
  const newEventArray = eventArray.map((event, eventIndex) => {
    const curEvent = event;
    const { id, beginAt, endAt } = curEvent;

    curEvent.length = 1;
    if (!(id in eventHash)) newEventHash[`${id}`] = initEventHash(beginAt, endAt, firstDate);
    if (boxHeight - (eventIndex + 1) * 24 < 22) {
      newEventHash[`${id}`].labelLength -= 1;
    } else {
      const { newLabelLength, newIsNextRow, length } = getLabelLength(
        newEventHash[`${id}`].labelLength,
        newEventHash[`${id}`].isNextRow,
        dateIndex
      );
      newEventHash[`${id}`] = { labelLength: newLabelLength, isNextRow: newIsNextRow };
      curEvent.length = length;
    }
    return curEvent;
  });
  return { newEventArray, newEventHash };
}

// eventHash 에 없으면 해당 이벤트 초기값 설정
function initEventHash(beginAt, endAt, firstDate) {
  let labelLength =
    Math.floor((new Date(endAt).getTime() - new Date(beginAt).getTime()) / 86400000) + 1;
  if (firstDate > new Date(beginAt).getTime()) {
    labelLength = Math.ceil((new Date(endAt).getTime() - firstDate) / 86400000);
  }
  return { labelLength, isNextRow: false };
}

// 해당 이벤트 띠지 길이 계산
function getLabelLength(labelLength, IsNextRow, dateIndex) {
  let length = 1;
  let newLabelLength = labelLength;
  let newIsNextRow = IsNextRow;

  if (labelLength > 1) {
    length = -1;
    if (!(dateIndex % 7)) newIsNextRow = false;
    if (!newIsNextRow) {
      if (newLabelLength <= 7 - (dateIndex % 7)) {
        length = newLabelLength;
        newLabelLength = -1;
      } else {
        length = 7 - (dateIndex % 7);
        newLabelLength -= length;
        newIsNextRow = true;
      }
    }
  }
  return { newLabelLength, newIsNextRow, length };
}
