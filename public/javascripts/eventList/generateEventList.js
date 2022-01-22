import addDeleteEventListener from './deleteEventListener.js';
import addEditEventListener from './editEventListener.js';
import { createElementAddClass } from '../utils/domNodeUtils.js';
import { getFullDate, getFullTime, getDateGap, isBtwnDates } from '../utils/eventListUtils.js';

const dayWords = ['일', '월', '화', '수', '목', '금', '토'];

// 서버로부터 해당 유저의 event list를 받아옴
async function getEventList() {
  try {
    const res = await axios.get('/event/list/creator', {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (err) {
    return null;
  }
}

// 날짜 블록을 생성
function createDateElement(date) {
  const eventListDiv = document.querySelector('.eventlist');
  const eventListInfoDiv = eventListDiv.appendChild(
    createElementAddClass('div', ['eventlist-info'])
  );
  const day = new Date(date).getDay();
  const [eventYear, eventMonth, eventDate] = date.split('-');

  eventListInfoDiv.appendChild(
    createElementAddClass(
      'div',
      ['info-date'],
      ` ${+eventMonth}월 ${+eventDate}일 ${dayWords[day]}요일, ${eventYear}`
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
  eventContentDiv.appendChild(createElementAddClass('div', ['list-category', `${item.category}`]));

  const eventTitleAnchor = eventContentDiv.appendChild(
    createElementAddClass('a', ['list-content-anchor'])
  );
  eventTitleAnchor.href = '#';
  eventTitleAnchor.appendChild(createElementAddClass('div', ['list-content-title'], item.title));
  const eventContentInfoDiv = eventContentDiv.appendChild(
    createElementAddClass('div', ['list-content-info'])
  );

  eventContentInfoDiv.appendChild(
    createElementAddClass('div', ['list-content-time'])
  ).innerHTML = `<i class=material-icons-outlined>schedule</i> ${beginAt} ~ ${endAt}`;

  eventContentInfoDiv.appendChild(
    createElementAddClass('div', ['list-content-location'])
  ).innerHTML = `<i class=material-icons-outlined>location_on</i>${item.location}`;

  eventContentDiv.appendChild(createElementAddClass('div', ['list-content-icon'])).innerHTML =
    `<label> <input class='list-edit ${item.id}' type=button>` +
    `<i class=material-icons-outlined> edit_note </i></label>` +
    `<label> <input class='list-delete ${item.id}' type=button>` +
    `<i class=material-icons-outlined> delete </i></label>`;
}

function fillEventDates(eventDates, event) {
  const date = getFullDate(new Date(event.beginAt).getTime());
  const dateGap = getDateGap(event.beginAt, event.endAt);

  for (let i = 0; i <= dateGap; i += 1) {
    const [beginYear, beginMonth, beginDate] = date.split('-');
    const curDate = getFullDate(new Date(beginYear, +beginMonth - 1, +beginDate + i));
    if (!eventDates.includes(curDate)) eventDates.push(curDate);
  }
}

// 이벤트들을 받아와서 파싱 후 DOM element 생성
async function generateEventList() {
  try {
    const events = await getEventList();
    if (!events) throw Error('generateEventList : error : Failed to get event list');

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
  } catch (err) {
    console.error(err.stack);
    throw err;
  }
}

// 스크롤을 오늘 이후 이벤트에 고정
function fixScrollToNextEvent() {
  const eventListSection = document.querySelector('.eventlist');
  const outdatedDiv = document.querySelectorAll('.date-outdated');
  const lastOutdatedDivPosition =
    outdatedDiv[outdatedDiv.length - 1].getBoundingClientRect().bottom -
    eventListSection.getBoundingClientRect().top +
    40;
  eventListSection.scrollTo(0, lastOutdatedDivPosition);
}

generateEventList().then(() => {
  fixScrollToNextEvent();
  addDeleteEventListener();
  addEditEventListener();
});
