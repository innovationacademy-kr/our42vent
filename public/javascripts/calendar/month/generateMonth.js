import addListenersAfterRender from './addListenersAfterRender.js';
import fillDateEvents from './fillDateEvents.js';
import filterByCategories from './filterByCategories.js';
import { fillDateTitles, getParams, setYearMonth, adjustWeeks } from './monthPreset.js';
import { removeNodeList } from '../../utils/domNodeUtils.js';

// cli 렌더링에 필요한 날짜 & 이벤트 데이터 비동기 요청
async function getMonthData(year, month) {
  const { data } = sessionStorage.getItem('isMyEvent')
    ? await axios.get(`/calendar/myEvent/month/${year}/${month}`)
    : await axios.get(`/calendar/month/${year}/${month}`);
  return data;
}

// 월단위 캘린더 데이터 요청 및 cli 렌더링
export async function generateMonth() {
  try {
    const calendarSection = document.querySelector('.calendar-month');

    const { yearParam, monthParam } = getParams();
    const { dateEventArray, noWeeks, year, monthIndex } = await getMonthData(yearParam, monthParam);
    const categoriesArray = sessionStorage.getItem('categories').split('-').slice(1);
    const firstDate =
      dateEventArray[0].date !== 1
        ? new Date(year, monthIndex - 1, dateEventArray[0].date).getTime()
        : new Date(year, monthIndex, dateEventArray[0].date).getTime();

    removeNodeList(document.querySelectorAll('.month-date'));
    setYearMonth(year, monthIndex);
    fillDateTitles(calendarSection);
    adjustWeeks(noWeeks, calendarSection);

    const filteredDateEventArray = filterByCategories(
      JSON.stringify(dateEventArray),
      categoriesArray
    );
    fillDateEvents(filteredDateEventArray, firstDate, year);
    addListenersAfterRender(dateEventArray.flatMap(dateEvent => dateEvent.eventArray));
    return [dateEventArray, firstDate, year];
  } catch (err) {
    // TODO: 지워야하는 로그, 추후 적절한 에러 메시지 UI / 리다이렉션
    console.log(err.stack);
    return null;
  }
}

// resize 시 새로 렌더링 할 때 필요한 데이터 export
export const renderInfo = window.location.pathname === '/' ? [generateMonth()] : [];
