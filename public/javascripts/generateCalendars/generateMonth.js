import createElementAddClass from '../utils/createElementAddClass.js';

const monthWords = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

async function getMonthData() {
  try {
    const res = await axios.get('/calendar/month/2022/0', {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data); // TODO: 지워야하는 로그
    return res.data;
  } catch (err) {
    return err;
  }
}

async function generateMonth() {
  try {
    const calendarMonth = document.querySelector('.calendar-month');
    const { dateInfo, noWeeks, year, month, monthIndex } = await getMonthData();

    if (noWeeks === 6) {
      for (let i = 0; i < 7; i += 1)
        calendarMonth.appendChild(createElementAddClass('div', ['month-date']));
      calendarMonth.style.gridTemplate = '20px repeat(6, 1fr) / repeat(7, 1fr)';
    } else if (noWeeks === 4) {
      for (let i = 0; i < 7; i += 1) {
        calendarMonth.removeChild(calendarMonth.lastChild);
      }
      calendarMonth.style.gridTemplate = '20px repeat(4, 1fr) / repeat(7, 1fr)';
    }
  } catch (err) {
    // TODO: 지워야하는 로그, 추후 적절한 에러 메시지 UI / 리다이렉션
    console.log(err.message);
  }
}

generateMonth();
