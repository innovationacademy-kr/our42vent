import api from '../utils/createAxiosInterceptor.js';
import { createElementAddClass } from '../utils/domNodeUtils.js';
import { getFullDate, getFullTime } from './parseDate.js';

// 서버로부터 해당 유저의 event list를 받아옴
async function getEventList() {
  const data = await api
    .get('/event/list/data')
    .catch(err => window.location.replace('/error/500'));
  return data || [];
}

// 날짜 블록을 생성
function createDateElement(date) {
  const dayWords = ['일', '월', '화', '수', '목', '금', '토'];
  const eventListDiv = document.querySelector('.eventlist');
  const eventListInfoDiv = eventListDiv.appendChild(
    createElementAddClass('div', ['eventlist-info'])
  );
  const day = new Date(date).getDay();
  const [eventYear, eventMonth, eventDate] = date.split('-');

  eventListInfoDiv.appendChild(
    createElementAddClass(
      'div',
      ['info-date', 'large', 'text-bold'],
      ` ${Number(eventMonth)}월 ${Number(eventDate)}일 ${dayWords[day]}요일, ${eventYear}`
    )
  );

  eventListInfoDiv.appendChild(createElementAddClass('hr', ['date-divider']));
  return eventListInfoDiv;
}

// 특정 날짜의 이벤트 리스트 생성
function createEventListElement(eventListInfoDiv, item, isOutdated) {
  const beginAt = `${getFullDate(item.beginAt).replaceAll('-', '/').slice(5)}  ${getFullTime(
    item.beginAt
  )}`;
  const endAt = `${getFullDate(item.endAt).replaceAll('-', '/').slice(5)}  ${getFullTime(
    item.endAt
  )}`;

  const eventContentDiv = eventListInfoDiv.appendChild(
    createElementAddClass(
      'div',
      isOutdated === true ? ['eventlist-list', 'date-outdated'] : ['eventlist-list']
    )
  );
  eventContentDiv.appendChild(
    createElementAddClass('div', ['list-category', `category-${item.category}`])
  );

  eventContentDiv.appendChild(
    createElementAddClass('div', [`_eventId-${item.id}`, 'list-content-title'], item.title)
  );

  eventContentDiv.appendChild(
    createElementAddClass('div', ['list-content-time'])
  ).innerHTML = `<i class=material-icons-outlined>schedule</i> ${beginAt} ~ ${endAt}`;

  eventContentDiv.appendChild(
    createElementAddClass('div', ['list-content-location'])
  ).innerHTML = `<i class=material-icons-outlined>location_on</i>${item.location}`;

  eventContentDiv.appendChild(createElementAddClass('div', ['list-content-icon'])).innerHTML =
    `<label> <input class='${item.id} list-edit' type=button>` +
    `<i class=material-icons-outlined> edit_note </i></label>` +
    `<label> <input class='${item.id} list-delete' type=button>` +
    `<i class=material-icons-outlined> delete </i></label>`;
}

function fillEventDates(eventDates, event) {
  const date = getFullDate(new Date(event.beginAt).getTime());
  const dateGap = Math.floor(
    (new Date(event.endAt).setHours(0, 0, 0, 0) - new Date(event.beginAt).setHours(0, 0, 0, 0)) /
      8.64e7
  );

  for (let i = 0; i <= dateGap; i += 1) {
    const [beginYear, beginMonth, beginDate] = date.split('-');
    const curDate = getFullDate(new Date(beginYear, Number(beginMonth) - 1, Number(beginDate) + i));
    if (!eventDates.includes(curDate)) eventDates.push(curDate);
  }
}

function showNoEventMessage() {
  const eventListSection = document.querySelector('.eventlist');
  eventListSection.appendChild(
    createElementAddClass('div', ['eventlist-no-content', 'xxlarge'], '생성한 이벤트가 없습니다.')
  );
}

// 이벤트가 특정 날짜에 일어나는지 확인
function isBtwnDates(curDate, beginAt, endAt) {
  return (
    curDate.localeCompare(getFullDate(new Date(beginAt).getTime())) >= 0 &&
    curDate.localeCompare(getFullDate(new Date(endAt).getTime())) <= 0
  );
}

// 이벤트들을 받아와서 파싱 후 DOM element 생성
export default async function generateEventList() {
  const events = await getEventList();

  if (!events.length) showNoEventMessage();
  else {
    const today = getFullDate(new Date(Date.now()).getTime());
    const eventDates = [];
    let eventListInfoDiv = null;

    // 생성해야 하는 날짜들을 eventDates 배열에 push
    events.forEach(item => {
      fillEventDates(eventDates, item);
    });
    eventDates.forEach(curDate => {
      eventListInfoDiv = createDateElement(curDate);
      const isOutdated = curDate.localeCompare(today) < 0;
      // event들을 돌면서 beginAt과 endAt 사이에 해당 날짜가 있으면 이벤트 목록을 생성
      events.forEach(item => {
        if (isBtwnDates(curDate, item.beginAt, item.endAt))
          createEventListElement(eventListInfoDiv, item, isOutdated);
      });
    });
  }
}
