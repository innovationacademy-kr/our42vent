import { Calendar } from 'calendar';
import localizeDateTime from './dateTimeUtils.js';

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
  const monthDates = calendar.monthDates(year, month);
  return {
    noWeeks: monthDates.length,
    dates: monthDates.flat(1).map(date => new Date(date.setHours(9))),
  };
}

// 해당 월 SELECT 된 이벤트들 beginAt & endAt 로컬 타임존으로 변환
export function localizeEventTime(events) {
  events.forEach(event => {
    const eventUpdated = event;
    eventUpdated.beginAt = localizeDateTime(event.beginAt);
    eventUpdated.endAt = localizeDateTime(event.endAt);
  });
}

// day & events 맵핑, holiday flag & dateEventArray 객체 반환
export function mapDayEvent(dates, monthEventsArray, holidays) {
  return dates.map((day, dateIndex) => {
    const dayString = day.toISOString();

    let isHoliday = false; // 평일
    if (holidays.includes(dayString) || !(dateIndex % 7)) isHoliday = true; // 일요일 + 공휴일

    const eventArray = monthEventsArray.filter(event => {
      const { beginAt, endAt } = event;
      return (
        dayString.slice(0, 11) === beginAt.toISOString().slice(0, 11) ||
        (beginAt.getTime() <= day.getTime() && day.getTime() <= endAt.getTime())
      );
    });

    return {
      isHoliday,
      eventArray,
      date: day.getDate(),
      month: day.getMonth(),
      slot: {},
    };
  });
}
