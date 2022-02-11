import addListenersAfterRender from './addListenersAfterRender.js';
import fillDateEvents from './fillDateEvents.js';
import filterByCategories from './filterByCategories.js';
import { renderInfo } from './generateMonth.js';
import { removeNodeList } from '../../utils/domNodeUtils.js';

// resize 및 카테고리 적용 변할 때 달력 다시그려주기
export default function redrawMonth() {
  removeNodeList(document.querySelectorAll('.month-date-day'));
  removeNodeList(document.querySelectorAll('.month-date-events'));
  renderInfo[0].then(monthData => {
    const [dateEventArray, firstDate, year] = monthData;
    const categoriesArray = sessionStorage.getItem('categories').split('-').slice(1);

    dateEventArray.forEach(dataEvent => {
      const newDateEvent = dataEvent;
      newDateEvent.slot = {};
    });

    const filteredDateEventArray = filterByCategories(
      JSON.stringify(dateEventArray),
      categoriesArray
    );
    fillDateEvents(filteredDateEventArray, firstDate, year);
    addListenersAfterRender(filteredDateEventArray.flatMap(dateEvent => dateEvent.eventArray));
  });
}
