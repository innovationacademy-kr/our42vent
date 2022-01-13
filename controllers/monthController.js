import {
  checkYearMonthRange,
  getMonthDates,
  getMonthRange,
  mapDayEvent,
} from '../lib/calendar/monthUtils.js';
import getHolidays from '../lib/calendar/holidaysUtils.js';
import { selectMonthEvents } from '../models/accessEventTable.js';

// month 데이터 json 으로 가공 & client 에 전송
export default async function monthController(req, res) {
  try {
    const yearParam = Number(req.params.year);
    const monthParam = Number(req.params.month);

    const { year, month } = checkYearMonthRange(yearParam, monthParam);
    const { noWeeks, dates } = getMonthDates(year, month);
    const { firstSQLDate, lastSQLDate } = getMonthRange(dates[0], dates.at(-1));
    const monthEvents = await selectMonthEvents(firstSQLDate, lastSQLDate);
    const holidays = await getHolidays(dates, year, month);
    const dateEvents = mapDayEvent(dates, monthEvents, holidays);

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
