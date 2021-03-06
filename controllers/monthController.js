import { logger } from '../config/winston.js';
import getHolidayCache from '../lib/calendar/getHolidayCache.js';
import { checkYearMonthRange, getMonthDates, mapDayEvent } from '../lib/calendar/monthUtils.js';
import { selectMonthEvents } from '../models/accessEventTable.js';
import { selectMyEvents } from '../models/accessMyEventTable.js';

// month 데이터 json 으로 가공 & client 에 전송
export default async function monthController(req, res, next) {
  try {
    const yearParam = Number(req.params.year);
    const monthParam = Number(req.params.month);
    const cacheKey = `m_${yearParam}${monthParam}`;

    const { year, month } = checkYearMonthRange(yearParam, monthParam);
    const { noWeeks, dates } = getMonthDates(year, month);
    const [firstDate, lastDate] = [
      dates[0].toISOString(),
      `${dates.at(-1).toISOString().slice(0, 10)}T23:59`,
    ];

    const holidays = await getHolidayCache(cacheKey);

    const monthEventsArray = req.path.includes('myEvent')
      ? await selectMyEvents(res.locals.userId, firstDate, lastDate)
      : await selectMonthEvents(firstDate, lastDate);
    const dateEventArray = mapDayEvent(dates, monthEventsArray, holidays);

    res.json({
      dateEventArray,
      year: Number(year),
      monthIndex: Number(month),
      noWeeks: Number(noWeeks),
    });
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}
