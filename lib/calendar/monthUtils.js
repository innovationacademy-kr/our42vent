import { Calendar } from 'calendar';

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

// 해당 달력에 표시될 처음 & 마지막 날짜 sql datetime string 으로 반환
export function getMonthRange(first, last) {
  const firstSQLDate = first.toISOString().slice(0, 19).replace('T', ' ');
  const lastSQLDate = last.toISOString().slice(0, 19).replace('T', ' ');
  return { firstSQLDate, lastSQLDate };
}

// day & events 맵핑, holiday flag & dateEvents 객체 반환
export function mapDayEvent(dates, monthEvents, holidays) {
  return dates.map((day, index) => {
    let isHoliday = 0; // 평일
    if (holidays.includes(day.toISOString()) || !(index % 7)) {
      isHoliday = 2; // 일요일 + 공휴일
    } else if (index % 7 === 6) {
      isHoliday = 1; // 토요일
    }

    const eventArray = monthEvents
      .filter(event => day.toISOString().slice(0, 11) === event.beginAt.toISOString().slice(0, 11))
      .map(event => {
        const eventUpdated = event;
        eventUpdated.duration = event.endAt.getDate() - event.beginAt.getDate() + 1;
        return eventUpdated;
      });

    return {
      isHoliday,
      date: day.getDate(),
      events: eventArray,
    };
  });
}
