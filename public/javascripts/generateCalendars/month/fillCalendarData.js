import mapEventSlot from './mapEventSlot.js';
import mapLabelLength from './mapLableLength.js';
import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 날짜 & 띠지 렌더링 엔트리 함수
export default function fillDateEvents(dateEventArray, firstDate) {
  const dateElemArray = document.querySelectorAll('.month-date');
  let eventHash = {};
  dateElemArray.forEach((dateDiv, dateIndex) => {
    const curDateEvent = dateEventArray[dateIndex];

    fillDay(dateDiv, curDateEvent);

    const eventsDiv = dateDiv.appendChild(createElementAddClass('div', ['month-date-events']));

    const { newEventArray, newEventHash } = mapLabelLength(
      firstDate,
      dateIndex,
      curDateEvent.eventArray,
      eventHash
    );
    eventHash = { ...newEventHash };
    curDateEvent.eventArray = newEventArray;
    mapEventSlot(dateEventArray, dateIndex, newEventArray);

    fillEvents(curDateEvent, eventsDiv);
  });
}

// 날짜 표시 & 공휴일 빨간색 표시
function fillDay(dateDiv, curDateEvent) {
  let holidayClass = null;
  if (curDateEvent.isHoliday === 1) holidayClass = 'sunday';

  dateDiv.appendChild(
    createElementAddClass('div', ['month-date-day', 'small', holidayClass], curDateEvent.date)
  );
}

// 이벤트 띠지 표시, 공간이 있으면 띠지 없으면 n more 표시
function fillEvents(curDateEvent, eventsDiv) {
  const boxHeight = document.querySelector('.month-date').offsetHeight - 20;

  const { eventArray, slot } = curDateEvent;
  const slotKeyArray = Object.keys(slot);

  for (let i = 0; i < slotKeyArray.length; i += 1) {
    const eventArrayIndex = slot[`${slotKeyArray[i]}`];

    if (eventArrayIndex === -1) {
      eventsDiv.appendChild(createElementAddClass('div', ['month-label-single', 'xsmall']));
    } else if (boxHeight - (i + 1) * 24 >= 22) {
      const eventInfo = eventArray[eventArrayIndex];
      createLabel(eventInfo, eventsDiv, eventArrayIndex);
    } else {
      eventsDiv.appendChild(
        createElementAddClass('div', ['month-date-more', 'xsmall'], `${eventArray.length - i} more`)
      );
      break;
    }
  }
}

// 띠지 HTML element 생성 & append, 하루 이상 이벤트 띠지 길이 & 위치 설정
function createLabel(eventInfo, eventsDiv, eventArrayIndex) {
  const { category, id, length, title } = eventInfo;
  const boxWidth = document.querySelector('.month-date-events').offsetWidth;

  const singleDayLabel =
    length === -1
      ? eventsDiv.appendChild(
          createElementAddClass('div', [`event-${id}`, 'month-label-single', 'xsmall'])
        )
      : eventsDiv.appendChild(
          createElementAddClass(
            'div',
            [`event-${id}`, 'month-label-single', 'xsmall', category],
            title
          )
        );

  if (length > 1) {
    const multiDayLabel = eventsDiv.appendChild(
      createElementAddClass('div', [`event-${id}`, 'month-label-multi', 'xsmall', category], title)
    );
    multiDayLabel.style.width = `${singleDayLabel.offsetWidth + boxWidth * (length - 1) - 6}`;
    multiDayLabel.style.top = `${20 + 24 * eventArrayIndex}`;
  }
}
