import { createLabel, fillMoreEventContent } from './fillEventsUtils.js';
import mapLabelSlots from './mapLabelSlots.js';
import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 날짜 & 띠지 렌더링 엔트리 함수
export default function fillDateEvents(dateEventArray, firstDate, year) {
  const dateElemArray = document.querySelectorAll('.month-date');
  const durationHash = {};

  dateElemArray.forEach((dateDiv, dateIndex) => {
    const curDateEvent = dateEventArray[dateIndex];
    fillDay(dateDiv, curDateEvent, year, new Date());

    const eventsDiv = dateDiv.appendChild(createElementAddClass('div', ['month-date-events']));

    mapLabelSlots(dateEventArray, dateIndex, durationHash, firstDate);
    fillEvents(dateEventArray, dateIndex, eventsDiv, durationHash);
  });
}

// 날짜 표시 & 공휴일 빨간색 표시
function fillDay(dateDiv, curDateEvent, year, today) {
  const { date, month } = curDateEvent;
  const holidayClass = curDateEvent.isHoliday ? 'sunday' : null;
  const todayClass =
    date !== today.getDate() || month !== today.getMonth() || year !== today.getFullYear()
      ? ''
      : 'today-circle';

  const daySlot = dateDiv.appendChild(
    createElementAddClass('div', ['month-date-day', 'small', holidayClass])
  );
  daySlot.innerHTML = `<span class="month-day-circle ${todayClass} text-center">${date}</span>`;
}

// 이벤트 띠지 표시, 공간이 있으면 띠지 없으면 n more 표시
function fillEvents(dateEventArray, dateIndex, eventsDiv, durationHash) {
  const curDateEvent = dateEventArray[dateIndex];
  const boxHeight = document.querySelector('.month-date').offsetHeight - 20;
  const { date, eventArray, slot } = curDateEvent;

  for (const slotIndex in slot) {
    const eventIndex = slot[`${slotIndex}`];

    if (eventIndex === -1) {
      eventsDiv.appendChild(createElementAddClass('div', ['month-label-empty']));
    } else if (boxHeight - (Number(slotIndex) + 1) * 24 >= 22) {
      const eventInfo = eventArray[eventIndex];
      createLabel(eventInfo, eventsDiv, Number(slotIndex), durationHash);
    } else {
      const moreButton = eventsDiv.appendChild(
        createElementAddClass(
          'button',
          ['month-more-button', 'xsmall', 'text-left'],
          `${eventArray.length - Number(slotIndex)} more`
        )
      );
      moreButton.type = 'button';
      const moreEventDiv = eventsDiv.appendChild(createElementAddClass('div', ['month-more']));
      fillMoreEventContent({
        date,
        dateIndex,
        durationHash,
        eventArray,
        moreEventDiv,
        isHoliday: curDateEvent.isHoliday,
        noDays: dateEventArray.length,
      });
      break;
    }
  }
}
