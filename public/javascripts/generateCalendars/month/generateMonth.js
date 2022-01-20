import fillDateEvents from './fillCalendarData.js';
import { getParams, setYearMonth, adjustWeeks } from './monthPreset.js';
import { removeNodeList } from '../../utils/domNodeUtils.js';

// cli 렌더링에 필요한 날짜 & 이벤트 데이터 비동기 요청
async function getMonthData(year, month) {
  try {
    const res = await axios.get(`/calendar/month/${year}/${month}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data); // TODO: 언젠가 지워야하는 로그 (일부러 아직 안 지우는 겁니다 ㅎㅎ)
    return res.data;
  } catch (err) {
    return err;
  }
}

// 월단위 캘린더 데이터 요청 및 cli 렌더링
export async function generateMonth() {
  try {
    const titleYear = document.querySelector('.title-calendar-year');
    const titleMonth = document.querySelector('.title-calendar-month');

    const { yearParam, monthParam } = getParams(titleYear, titleMonth);
    const { dateEventArray, noWeeks, year, monthIndex } = await getMonthData(yearParam, monthParam);

    removeNodeList(document.querySelectorAll('.month-date'));
    setYearMonth(year, monthIndex);
    adjustWeeks(noWeeks);
    const firstDate =
      dateEventArray[0].date !== 1
        ? new Date(year, monthIndex - 1, dateEventArray[0].date)
        : new Date(year, monthIndex, dateEventArray[0].date);
    fillDateEvents(dateEventArray, firstDate.getTime());
    return [dateEventArray, firstDate.getTime()];
  } catch (err) {
    // TODO: 지워야하는 로그, 추후 적절한 에러 메시지 UI / 리다이렉션
    console.log(err.message);
    return null;
  }
}

// resize 시 새로 렌더링 할 때 필요한 데이터 export
export const renderInfo = [generateMonth()];
