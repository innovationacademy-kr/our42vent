import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 띠지 HTML element 생성 & append, 하루 이상 이벤트 띠지 길이 & 위치 설정
export function createLabel(eventInfo, eventsDiv, slotIndex) {
  const { category, id, isMulti, length, title } = eventInfo;
  if (length === -1) {
    eventsDiv.appendChild(createElementAddClass('div', ['month-label-empty']));
  } else if (isMulti) {
    eventsDiv.appendChild(createMultiEndLabel(id, category, title));
  } else {
    createAppendSingleDayLabel(eventsDiv, id, category, title);
  }

  if (length > 1) {
    const boxWidth = document.querySelector('.calendar-month').offsetWidth / 7;
    const multiDayLabel = eventsDiv.appendChild(
      createElementAddClass(
        'div',
        [`_eventId-${id}`, 'month-label-multi', 'xsmall', category],
        title
      )
    );
    multiDayLabel.style.width = `${(boxWidth - 5) * 2 + boxWidth * (length - 2) - 1}`;
    multiDayLabel.style.top = `${20 + 24 * slotIndex}`;
  }
}

// more 버튼 클릭하면 뜨는 박스 생성 & 이벤트 띠지 표시
export function fillMoreEventContent(moreEventContentInfo) {
  const { date, dateIndex, eventArray, moreEventDiv, isHoliday, noDays } = moreEventContentInfo;

  if (noDays - dateIndex - 1 <= 7) moreEventDiv.style.bottom = 0;
  if (dateIndex % 7 === 6) moreEventDiv.style.right = 0;

  const holidayClass = isHoliday ? 'sunday' : null;
  moreEventDiv.appendChild(
    createElementAddClass('div', ['month-more-date', 'large', 'text-center', holidayClass], date)
  );

  const eventSlot = moreEventDiv.appendChild(createElementAddClass('div', ['month-more-event']));
  eventArray.forEach(event => {
    const { category, id, isMulti, length, title } = event;
    if (length === -1 || isMulti) {
      eventSlot.appendChild(createMultiEndLabel(id, category, title));
    } else {
      createAppendSingleDayLabel(eventSlot, id, category, title);
    }
  });
}

// 단일 이벤트 띠지 생성
function createAppendSingleDayLabel(parentNode, id, category, title) {
  const singleDayLabel = parentNode.appendChild(
    createElementAddClass('div', [`_eventId-${id}`, 'month-label-single', 'xsmall', category])
  );
  singleDayLabel.innerHTML = `<span class=single-category></span>${title}`;
}

// length === 1 연일 이벤트 띠지 생성
function createMultiEndLabel(id, category, title) {
  return createElementAddClass(
    'div',
    [`_eventId-${id}`, 'month-label-end', 'xsmall', category],
    title
  );
}
