import cacheMonthData from '../lib/calendar/cacheMonthData.js';
import { mapDayEvent } from '../lib/calendar/monthUtils.js';
import { selectMonthEvents } from '../models/accessEventTable.js';

// month 데이터 json 으로 가공 & client 에 전송
export default async function monthController(req, res) {
  try {
    const cacheKey = `m_${req.params.year + req.params.month}`;

    // 변경되지 않는 정보 cache 확인
    const { dates, firstSQLDate, holidays, lastSQLDate, month, noWeeks, year } =
      await cacheMonthData(cacheKey, Number(req.params.year), Number(req.params.month));

    // 변경될 수 있는 정보
    const monthEvents = await selectMonthEvents(firstSQLDate, lastSQLDate);
    const dateEvents = mapDayEvent(dates, monthEvents, holidays);

    return res.json({
      dateEvents,
      year: Number(year),
      monthIndex: Number(month),
      noWeeks: Number(noWeeks),
    });
  } catch (err) {
    return res.status(500).end();
  }
}
