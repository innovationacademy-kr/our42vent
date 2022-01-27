import getHolidayCache from '../lib/calendar/getHolidayCache.js';
import { checkYearMonthRange, getMonthDates, mapDayEvent } from '../lib/calendar/monthUtils.js';
import consoleLogger from '../lib/consoleLogger.js';
import { selectMonthEvents } from '../models/accessEventTable.js';

// month 데이터 json 으로 가공 & client 에 전송
export default async function monthController(req, res) {
  try {
    const yearParam = Number(req.params.year);
    const monthParam = Number(req.params.month);
    const cacheKey = `m_${yearParam}${monthParam}`;

    const { year, month } = checkYearMonthRange(yearParam, monthParam);
    const { noWeeks, dates } = getMonthDates(year, month);

    const holidays = await getHolidayCache(cacheKey);
    const monthEventsArray = await selectMonthEvents(
      dates[0].toISOString(),
      dates.at(-1).toISOString()
    );

    const dateEventArray = mapDayEvent(dates, monthEventsArray, holidays);

    return res.json({
      dateEventArray,
      year: Number(year),
      monthIndex: Number(month),
      noWeeks: Number(noWeeks),
    });
  } catch (err) {
    consoleLogger.error(err.stack);
    return res.status(500).end();
  }
}
