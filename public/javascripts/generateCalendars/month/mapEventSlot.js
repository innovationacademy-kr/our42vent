/**
 * 각 날짜별로 이벤트 띠지 공간 몇번째 슬롯에 해당 띠지 들어가야하는지
 * 날짜별 slot object 에 {slotIndex : 해당일에서 이벤트 index} 업데이트
 */
export default function mapEventSlot(dateEventArray, dateIndex, eventArray) {
  eventArray.forEach((event, eventIndex) => {
    const newDateEventArray = dateEventArray;
    if (!Object.values(newDateEventArray[dateIndex].slot).includes(eventIndex)) {
      if (event.length > 1) {
        for (let k = 0; k < event.length && dateIndex + k < newDateEventArray.length; k += 1) {
          const { eventArray } = newDateEventArray[dateIndex + k];
          const matchingEvent = eventArray.find(e => e.id === event.id);
          const index = eventArray.indexOf(matchingEvent);

          newDateEventArray[dateIndex + k].slot[`${eventIndex}`] = index;
        }
      } else if (event.length === 1) {
        newDateEventArray[dateIndex].slot[`${findKey(newDateEventArray[dateIndex].slot)}`] =
          eventIndex;
      } else if (event.length === -1) {
        newDateEventArray[dateIndex].slot[`${findKey(newDateEventArray[dateIndex].slot, 1)}`] =
          eventIndex;
      }
    }
  });
  fillEmptySlots(dateEventArray, dateIndex);
}

// 중간에 빈 슬롯 있으면 빈 div 로 채워줄 공간이라고 -1 index 로 표시
function fillEmptySlots(dateEventArray, dateIndex) {
  const newDateEvent = dateEventArray[dateIndex];
  const keyArray = Object.keys(newDateEvent.slot).map(key => Number(key));
  const maxKey = Math.max(...keyArray);

  let key = 0;
  while (key < maxKey) {
    while (keyArray.includes(key)) {
      key += 1;
    }
    newDateEvent.slot[`${key}`] = -1;
    key += 1;
  }
}

// slot index 설정
function findKey(slot, isMulti = 0) {
  const keyArray = Object.keys(slot).map(key => Number(key));
  const maxKey = Math.max(...keyArray);

  if (isMulti) return maxKey + 1;
  let key = 0;
  while (keyArray.includes(key)) {
    key += 1;
  }
  return key;
}
