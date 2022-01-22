import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 주 수에 따라 달력 row 생성
export function adjustWeeks(noWeeks) {
  const calendarMonth = document.querySelector('.calendar-month');

  if (noWeeks === 5) {
    calendarMonth.style.gridTemplate =
      '20px repeat(5, calc(calc(100% - 20px) / 5)) / repeat(7, calc(100% / 7))';
  } else if (noWeeks === 6) {
    calendarMonth.style.gridTemplate =
      '20px repeat(6, calc(calc(100% - 20px) / 6)) / repeat(7, calc(100% / 7))';
  } else if (noWeeks === 4) {
    calendarMonth.style.gridTemplate =
      '20px repeat(4, calc(calc(100% - 20px) / 4)) / repeat(7, calc(100% / 7))';
  }

  for (let i = 0; i < noWeeks * 7; i += 1) {
    const dateDiv = createElementAddClass('div', ['month-date'], null);
    calendarMonth.appendChild(dateDiv);
  }
}

// server 에 요청할 year & month 파싱
export function getParams(titleYear, titleMonth) {
  let yearParam = null;
  let monthParam = null;

  if (titleMonth.id === '' || titleYear.id === '') {
    const now = new Date();
    yearParam = now.getFullYear();
    monthParam = now.getMonth();
  } else {
    yearParam = titleYear.id.substring(5);
    monthParam = titleMonth.id.substring(6);
  }
  return { yearParam, monthParam };
}

// 헤더 가운데에 현재 달력 year & month 표시
export function setYearMonth(year, monthIndex) {
  const titleYear = document.querySelector('.title-calendar-year');
  const titleMonth = document.querySelector('.title-calendar-month');

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

  titleMonth.textContent = monthWords[monthIndex];
  titleMonth.id = `month-${monthIndex}`;

  titleYear.textContent = year;
  titleYear.id = `year-${year}`;
}
