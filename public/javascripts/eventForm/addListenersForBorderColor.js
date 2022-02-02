import addCategoryEventListener from './utils/addCategoryEventListener.js';
import addTextEventListener from './utils/addTextEventListener.js';
import addTimeEventListener from './utils/addTimeEventListener.js';

function addListenersForBorderColor() {
  const textIds = ['event-title', 'event-pic', 'event-location', 'event-topic', 'event-details'];

  textIds.forEach(textId => addTextEventListener(textId));
  addTimeEventListener();
  addCategoryEventListener();
}

addListenersForBorderColor();
