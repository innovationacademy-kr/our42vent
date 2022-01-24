// 이벤트별 띠지 길이 설정 & 띠지 slot 설정 엔트리 함수
export default function mapLabelSlots(dateEventArray, dateIndex, durationHash, firstDate) {
  const newDurationHash = durationHash;
  const boxHeight = document.querySelector('.month-date').offsetHeight - 20;
  const curEventArray = dateEventArray[dateIndex].eventArray;

  curEventArray.forEach((event, eventIndex) => {
    const curEvent = event;
    const { id, beginAt, endAt } = curEvent;

    if (!(id in durationHash))
      newDurationHash[`${id}`] = initDurationHash(beginAt, endAt, firstDate);
    curEvent.isMulti = newDurationHash[`${id}`].remainingDays > 1;
    curEvent.length = getLabelLength(boxHeight, dateIndex, eventIndex, newDurationHash[`${id}`]);
    if (!Object.values(dateEventArray[dateIndex].slot).includes(eventIndex))
      setSlots(dateEventArray, dateIndex, curEvent, eventIndex);
  });
  fillEmptySlots(dateEventArray, dateIndex);
}

// durationHash 에 없으면 해당 이벤트 초기값 설정
function initDurationHash(beginAt, endAt, firstDate) {
  const remainingDays =
    firstDate > new Date(beginAt).getTime()
      ? Math.floor((new Date(endAt).getTime() - firstDate) / 86400000) + 1
      : Math.floor((new Date(endAt).getTime() - new Date(beginAt).getTime()) / 86400000) + 1;
  return { remainingDays, isNextRow: false };
}

/**
 * 모든 이벤트 'id : { 띠지 길이, 다음행 점검 }' 형태로 담는 durationHash
 * 해당 이벤트 durationHash 에 아직 표시해야하는 띠지 길이 업데이트
 * 이벤트 띠지 길이 (length) 설정
 */
function getLabelLength(boxHeight, dateIndex, eventIndex, curDurationInfo) {
  const newDurationInfo = curDurationInfo;

  let length = newDurationInfo.remainingDays >= 1 ? 1 : -1;
  if (boxHeight - (eventIndex + 1) * 24 < 22) {
    newDurationInfo.remainingDays -= 1;
  } else if (newDurationInfo.remainingDays > 1) {
    length = -1;
    if (!(dateIndex % 7)) newDurationInfo.isNextRow = false;
    if (!newDurationInfo.isNextRow) {
      if (newDurationInfo.remainingDays <= 7 - (dateIndex % 7)) {
        length = newDurationInfo.remainingDays;
        newDurationInfo.remainingDays = -1;
      } else {
        length = 7 - (dateIndex % 7);
        newDurationInfo.remainingDays -= length;
        newDurationInfo.isNextRow = true;
      }
    }
  }
  return length;
}

/**
 * 각 날짜별로 이벤트 띠지 공간 몇번째 슬롯에 해당 띠지 들어가야하는지
 * 날짜별 slot object 에 {slotIndex : 해당일에서 이벤트 index} 업데이트
 */
function setSlots(dateEventArray, dateIndex, curEvent, eventIndex) {
  const newDateEventArray = dateEventArray;
  const { id, length } = curEvent;
  const curSlot = newDateEventArray[dateIndex].slot;

  if (length > 1) {
    for (let k = 0; k < length && dateIndex + k < newDateEventArray.length; k += 1) {
      const { eventArray } = newDateEventArray[dateIndex + k];
      const matchingIndex = eventArray.findIndex(e => e.id === id);
      const slotIndex = curSlot[`${eventIndex}`]
        ? `${eventIndex}`
        : `${findSlotIndex(newDateEventArray[dateIndex + k].slot)}`;
      newDateEventArray[dateIndex + k].slot[slotIndex] = matchingIndex;
    }
  } else if (length === 1) {
    curSlot[`${findSlotIndex(curSlot)}`] = eventIndex;
  }
}

// 중간에 빈 슬롯 있으면 빈 div 로 채워줄 공간이라고 -1 index 로 표시
function fillEmptySlots(dateEventArray, dateIndex) {
  const newDateEvent = dateEventArray[dateIndex];
  const keyArray = Object.keys(newDateEvent.slot).map(key => Number(key));
  const maxSlotIndex = Math.max(...keyArray);

  let slotIndex = 0;
  while (slotIndex + 1 < maxSlotIndex) {
    while (keyArray.includes(slotIndex)) {
      slotIndex += 1;
    }
    newDateEvent.slot[`${slotIndex}`] = -1;
    slotIndex += 1;
  }
}

// slot index 설정
function findSlotIndex(slot) {
  const keyArray = Object.keys(slot).map(key => Number(key));

  let slotIndex = 0;
  while (keyArray.includes(slotIndex)) {
    slotIndex += 1;
  }
  return slotIndex;
}
