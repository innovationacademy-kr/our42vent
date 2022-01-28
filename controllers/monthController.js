import cacheMonthData from '../lib/calendar/cacheMonthData.js';
import { mapDayEvent } from '../lib/calendar/monthUtils.js';
import consoleLogger from '../lib/consoleLogger.js';
import { selectMonthEvents } from '../models/accessEventTable.js';
import { selectMyEvents } from '../models/accessMyEventTable.js';

// month 데이터 json 으로 가공 & client 에 전송
export default async function monthController(req, res) {
  try {
    const cacheKey = `m_${req.params.year + req.params.month}`;

    // 변경되지 않는 정보 cache 확인
    const { dates, firstSQLDate, holidays, lastSQLDate, month, noWeeks, year } =
      await cacheMonthData(cacheKey, Number(req.params.year), Number(req.params.month));

    // 변경될 수 있는 정보
    const monthEventsArray = req.path.includes('myEvent')
      ? await selectMyEvents(res.locals.userId, firstSQLDate, lastSQLDate)
      : await selectMonthEvents(firstSQLDate, lastSQLDate);
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
