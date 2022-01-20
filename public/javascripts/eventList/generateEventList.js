import { createElementAddClass } from '../utils/domNodeUtils.js';

const monthWords = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dayWords = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
async function getEventList() {
  try {
    const res = await axios.get('/event/list/creator', {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    return null;
  }
}

function getToday() {
  const now = new Date(new Date().getTime() + 3.24e7);
  const [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()];
  return month < 10 ? `${year}-0${month + 1}-${date}` : `${year}-${month + 1}-${date}`;
}

function getFullDate(timestamp) {
  const fullDay = new Date(timestamp);
  const [year, month, date] = [fullDay.getFullYear(), fullDay.getMonth(), fullDay.getDate()];
  return month < 10 ? `${year}-0${month + 1}-${date}` : `${year}-${month + 1}-${date}`;
}

function getFullTime(timestamp) {
  const fullTime = new Date(timestamp);
  let [hour, min] = [fullTime.getHours(), fullTime.getMinutes()];
  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;

  return `${hour}:${min}`;
}

function getDateGap(begin, end) {
  return Math.floor((new Date(end).getTime() - new Date(begin).getTime()) / (1000 * 60 * 60 * 24));
}

// 날짜 블록을 생성해줌
function createDateElement(date) {
  const eventListBlock = document.querySelector('.eventlist');
  const eventListInfoBlock = eventListBlock.appendChild(
    createElementAddClass('div', ['eventlist-info'])
  );
  const day = new Date(date).getDay();
  const [eventYear, eventMonth, eventDate] = date.split('-');

  eventListInfoBlock.appendChild(
    createElementAddClass(
      'div',
      ['info-date'],
      `${dayWords[day]} ${monthWords[+eventMonth - 1]} ${eventDate}, ${eventYear}`
    )
  );

  eventListInfoBlock.appendChild(createElementAddClass('hr', ['date-divider']));
  return eventListInfoBlock;
}

// 특정 날짜의 이벤트 블록을 만들어줌
function createEventListElement(eventListInfoBlock, item, isOutdated) {
  const beginAt = `${getFullDate(item.beginAt).replaceAll('-', '/').slice(5)}  ${getFullTime(
    item.beginAt
  )}`;
  const endAt = `${getFullDate(item.endAt).replaceAll('-', '/').slice(5)}  ${getFullTime(
    item.endAt
  )}`;
  const eventContentBlock = eventListInfoBlock.appendChild(
    createElementAddClass(
      'div',
      isOutdated === true ? ['eventlist-list', 'date-outdated'] : ['eventlist-list']
    )
  );
  eventContentBlock.appendChild(
    createElementAddClass('div', ['list-category', `category-${item.category}`])
  );
  eventContentBlock.appendChild(
    createElementAddClass('div', ['list-content-title'])
  ).innerHTML = `<a href=#> ${item.title} </a>`;
  const eventContentInfoBlock = eventContentBlock.appendChild(
    createElementAddClass('div', ['list-content-info'])
  );
  eventContentInfoBlock.appendChild(
    createElementAddClass('div', ['list-content-time'])
  ).innerHTML = `<i class=material-icons-outlined>schedule</i> ${beginAt} ~ ${endAt}`;
  eventContentInfoBlock.appendChild(
    createElementAddClass('div', ['list-content-location'])
  ).innerHTML = `<i class=material-icons-outlined>location_on</i>${item.location}`;
  eventContentBlock.appendChild(createElementAddClass('div', ['list-content-icon'])).innerHTML =
    '<a href=#><i class=material-icons-outlined> edit_note </i></a>' +
    '<a href=#><i class=material-icons-outlined> delete </i></a>';
}

async function generateEventList() {
  try {
    const events = await getEventList();

    if (!events) throw Error('generateEventList : error : Failed to get event list');

    const today = getToday();
    const eventDates = [];
    let eventListInfoBlock = null;
    // 해당 date가 없으면 만들고 push, 있으면 해당 date 에 push
    events.forEach(item => {
      const date = getFullDate(new Date(item.beginAt).getTime() + 3.24e7);
      const dateGap = getDateGap(item.beginAt, item.endAt);

      //   FIXME : date의 range로 파악해야함
      for (let i = 0; i <= dateGap; i += 1) {
        const [beginYear, beginMonth, beginDate] = date.split('-');
        const curDate = getFullDate(new Date(beginYear, +beginMonth - 1, +beginDate + i));
        // const isOutdated = curDate.localeCompare(today) < 0;
        if (!eventDates.includes(curDate)) {
          eventDates.push(curDate);
          //   eventListInfoBlock = createDateElement(curDate);
          //   createEventListElement(eventListInfoBlock, item, isOutdated);
          // } else {
          //   createEventListElement(eventListInfoBlock, item, isOutdated);
        }
      }
    });
    // const [beginYear, beginMonth, beginDate] = date.split('-');
    // const curDate = getFullDate(new Date(beginYear, +beginMonth - 1, +beginDate + i));
    // console.log(curDate, item.title);
    // const isOutdated = curDate.localeCompare(today) < 0;
    // if (!eventDates.includes(curDate)) {
    //   eventDates.push(curDate);
    //   eventListInfoBlock = createDateElement(curDate);
    //   createEventListElement(eventListInfoBlock, item, isOutdated);
    // } else {
    //   createEventListElement(eventListInfoBlock, item, isOutdated);
    // }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

generateEventList();
