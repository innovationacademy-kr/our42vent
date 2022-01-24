import addListenersAfterRender from './addListenersAfterRender.js';
import fillDateEvents from './fillDateEvents.js';
import { renderInfo } from './generateMonth.js';
import { removeNodeList } from '../../utils/domNodeUtils.js';

// resize 반응해서 기존 이벤트 슬롯 지우고 띠지 다시 렌더링
window.addEventListener('resize', () => {
  removeNodeList(document.querySelectorAll('.month-date-day'));
  removeNodeList(document.querySelectorAll('.month-date-events'));
  renderInfo[0].then(monthData => {
    const [dateEventArray, firstDate, year] = monthData;

    dateEventArray.forEach(dataEvent => {
      const newDateEvent = dataEvent;
      newDateEvent.slot = {};
    });
    fillDateEvents(dateEventArray, firstDate, year);
    addListenersAfterRender(dateEventArray.flatMap(dateEvent => dateEvent.eventArray));
  });
});
