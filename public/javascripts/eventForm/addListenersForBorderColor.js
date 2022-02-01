import addCategoryEventListener from './utils/addCategoryEventListener.js';
import addTextEventListener from './utils/addTextEventListener.js';
import addTimeEventListener from './utils/addTimeEventListener.js';

function addListenersForBorderColor() {
  addTextEventListener('event-title', 224, true, false);
  addTextEventListener('event-pic', 56, false, false);
  addTextEventListener('event-location', 224, true, false);
  addTextEventListener('event-topic', 480, true, true);
  addTextEventListener('event-details', 4064, false, true);
  addTimeEventListener();
  addCategoryEventListener();
}

addListenersForBorderColor();
