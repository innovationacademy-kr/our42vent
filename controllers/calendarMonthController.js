import {
  checkYearMonthRange,
  getHolidayArray,
  getMonthDates,
  getMonthRange,
  mapDayEvent,
} from '../lib/calendar/calendarMonthData.js';
import selectMonthEvents from '../models/selectMonthEvents.js';

export default async function calendarMonthController(req, res) {
  try {
    const yearParam = Number(req.params.year);
    const monthParam = Number(req.params.month);

    // param 에 담긴 year & month 값 범위 점검 예외처리
    const { year, month } = checkYearMonthRange(yearParam, monthParam);

    // 해당 월의 주 수 & datetime array 반환
    const { noWeeks, dates } = getMonthDates(year, month);

    // 해당 달력에 표시될 처음 & 마지막 날짜 반환
    const { firstDate, lastDate } = getMonthRange(dates[0], dates.at(-1));

    // 처음 & 마지막 날 범위 안에 시작하는 이벤트 select
    const monthEvents = await selectMonthEvents(firstDate, lastDate);

    // 국가 공휴일 데이터 array 형태로 반환
    const holidays = await getHolidayArray(year, month + 1);

    // day & events 맵핑 & dateEvents 객체 반환
    const dateEvents = mapDayEvent(dates, monthEvents);

    return res.json({
      dateEvents,
      noWeeks,
      year,
      monthIndex: month,
    });
  } catch (err) {
    return err;
  }
}
