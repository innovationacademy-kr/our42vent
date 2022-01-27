import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 주 수에 따라 달력 row 생성
export function adjustWeeks(noWeeks, calendarSection) {
  const calendarMonth = calendarSection;
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
  calendarMonth.style.borderLeft = 'var(--calendar_border) solid 1px';
  calendarMonth.style.borderTop = 'var(--calendar_border) solid 1px';
}

// 요일 표시
export function fillDateTitles(calendarSection) {
  const calendarMonth = calendarSection;
  calendarMonth.innerHTML =
    '<div class="day-title text-center">일</div><div class="day-title text-center">월</div>' +
    '<div class="day-title text-center">화</div><div class="day-title text-center">수</div>' +
    '<div class="day-title text-center">목</div><div class="day-title text-center">금</div>' +
    '<div class="day-title text-center">토</div>';
}

// server 에 요청할 year & month 파싱
export function getParams(titleYear, titleMonth) {
  let yearParam = null;
  let monthParam = null;
  const yearMonth = sessionStorage.getItem('yearMonth');

  if (!yearMonth) {
    const now = new Date();
    yearParam = now.getFullYear();
    monthParam = now.getMonth();
    sessionStorage.setItem('yearMonth', `${yearParam}${monthParam}`);
  } else {
    yearParam = yearMonth.slice(0, 4);
    monthParam = yearMonth.substring(4);
  }
  return { yearParam, monthParam };
}

// 헤더 가운데에 현재 달력 year & month 표시
export function setYearMonth(year, monthIndex) {
  const titleYear = document.querySelector('.title-calendar-year');
  const titleMonth = document.querySelector('.title-calendar-month');

  titleMonth.textContent = `${monthIndex + 1}월`;
  titleYear.textContent = year;
}
