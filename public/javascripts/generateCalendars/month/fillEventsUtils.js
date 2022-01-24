import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 띠지 HTML element 생성 & append, 하루 이상 이벤트 띠지 길이 & 위치 설정
export function createLabel(eventInfo, eventsDiv, slotIndex, durationHash) {
  const { category, id, isMulti, length, title } = eventInfo;
  const boxWidth = document.querySelector('.month-date-events').offsetWidth;

  if (length === -1) {
    eventsDiv.appendChild(createElementAddClass('div', ['month-label-empty']));
  } else if (isMulti) {
    eventsDiv.appendChild(createMultiEndLabel(id, category, title));
  } else {
    createAppendSingleDayLabel(eventsDiv, id, category, title);
  }

  if (length > 1) {
    const multiDayLabel = eventsDiv.appendChild(
      createElementAddClass('div', [`event-${id}`, 'month-label-multi', 'xsmall', category], title)
    );
    multiDayLabel.style.width = `${(boxWidth - 4) * 2 + boxWidth * (length - 2) - 1}`;
    multiDayLabel.style.top = `${20 + 24 * slotIndex}`;
  }
}

// more 버튼 클릭하면 뜨는 박스 생성 & 이벤트 띠지 표시
export function fillMoreEventContent(moreEventContentInfo) {
  const { date, dateIndex, durationHash, eventArray, moreEventDiv, isHoliday, noDays } =
    moreEventContentInfo;

  let rows = ' 1fr';
  for (let i = 1; moreEventDiv.style.gridTemplateRows !== '' && i < eventArray.length; i += 1)
    rows += rows;
  moreEventDiv.style.gridTemplateRows = `40px${rows}`;
  if (noDays - dateIndex - 1 <= 7) moreEventDiv.style.bottom = 0;

  const holidayClass = isHoliday ? 'sunday' : null;
  moreEventDiv.appendChild(
    createElementAddClass('div', ['month-more-date', 'large', 'text-center', holidayClass], date)
  );

  eventArray.forEach(event => {
    const { category, id, isMulti, length, title } = event;
    if (length === -1 || isMulti) {
      moreEventDiv.appendChild(createMultiEndLabel(id, category, title));
    } else {
      createAppendSingleDayLabel(moreEventDiv, id, category, title);
    }
  });
}

// 단일 이벤트 띠지 생성
function createAppendSingleDayLabel(parentNode, id, category, title) {
  const singleDayLabel = parentNode.appendChild(
    createElementAddClass('div', [`event-${id}`, 'month-label-single', 'xsmall', category])
  );
  singleDayLabel.innerHTML = `<span class=single-category></span>${title}`;
}

// length === 1 연일 이벤트 띠지 생성
function createMultiEndLabel(id, category, title) {
  return createElementAddClass(
    'div',
    [`event-${id}`, 'month-label-end', 'xsmall', category],
    title
  );
}
