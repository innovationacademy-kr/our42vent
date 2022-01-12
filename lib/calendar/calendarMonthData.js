import axios from 'axios';
import { Calendar } from 'calendar';
import consoleLogger from '../../controllers/consoleLogger.js';

// param 에 담긴 year & month 값 범위 점검 예외처리
export function checkYearMonthRange(yearParam, monthParam) {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();

  let year = yearParam;
  if (year < 1970 || year > 4242) year = curYear;

  let month = monthParam;
  if (month < 0 || month > 11) month = curMonth;

  return { year, month };
}

// 해당 월의 주 수 & datetime array 반환
export function getMonthDates(year, month) {
  const calendar = new Calendar(0);
  const cur = calendar.monthDates(year, month);

  return { noWeeks: cur.length, dates: cur.flat(1) };
}

// 해당 달력에 표시될 첫 날짜 & 마지막 날짜 반환
export function getMonthRange(first, last) {
  const firstDate = first.toISOString().slice(0, 19).replace('T', ' ');
  const lastDate = last.toISOString().slice(0, 19).replace('T', ' ');
  return { firstDate, lastDate };
}

// day & events 맵핑 & dateEvents 객체 반환
export function mapDayEvent(dates, monthEvents) {
  const result = dates.map((day, index) => {
    const eventArray = monthEvents
      .filter(event => day.toISOString().slice(0, 11) === event.beginAt.toISOString().slice(0, 11))
      .map(event => {
        const eventUpdated = event;
        eventUpdated.duration = event.endAt.getDate() - event.beginAt.getDate() + 1;
        return eventUpdated;
      });
    return { date: day.getDate(), events: eventArray };
  });
  return result;
}
