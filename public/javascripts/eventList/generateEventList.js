import { createElementAddClass } from '../utils/domNodeUtils.js';
import { getFullDate, getFullTime, getDateGap, isBtwnDates } from '../utils/eventListUtils.js';

// const monthWords = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ];

const monthWords = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const dayWords = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
// const dayWords = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

// 날짜 블록을 생성해줌
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
      `${dayWords[day]} ${monthWords[+eventMonth - 1]} ${eventDate}일, ${eventYear}`
    )
  );

  eventListInfoDiv.appendChild(createElementAddClass('hr', ['date-divider']));
  return eventListInfoDiv;
}

// 특정 날짜의 이벤트 블록을 만들어줌
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
    '<a href=#><i class=material-icons-outlined> edit_note </i></a>' +
    '<a href=/event/list/delete><i class=material-icons-outlined> delete </i></a>';
}

async function generateEventList() {
  try {
    const events = await getEventList();
    if (!events) throw Error('generateEventList : error : Failed to get event list');

    const today = getFullDate(new Date(Date.now()).getTime());
    const eventDates = [];
    let eventListInfoDiv = null;

    // 생성해야 하는 날짜들을 eventDates 배열에 push
    events.forEach(item => {
      const date = getFullDate(new Date(item.beginAt).getTime());
      const dateGap = getDateGap(item.beginAt, item.endAt);

      for (let i = 0; i <= dateGap; i += 1) {
        const [beginYear, beginMonth, beginDate] = date.split('-');
        const curDate = getFullDate(new Date(beginYear, +beginMonth - 1, +beginDate + i));
        if (!eventDates.includes(curDate)) eventDates.push(curDate);
      }
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
    return events;
  } catch (err) {
    console.error(err.stack);
    throw err;
  }
}

function fixScrollToNextEvent() {
  const eventListSection = document.querySelector('.eventlist');
  const outdatedDiv = document.querySelectorAll('.date-outdated');
  const lastOutdatedDivPosition =
    outdatedDiv[outdatedDiv.length - 1].getBoundingClientRect().bottom -
    eventListSection.getBoundingClientRect().top +
    40;
  eventListSection.scrollTo(0, lastOutdatedDivPosition);
}

generateEventList().then(events => {
  fixScrollToNextEvent();
});
