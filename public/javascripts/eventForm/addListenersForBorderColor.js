import addStrEventListener from './utils/addStrEventListener.js';
import addTimeEventListener from './utils/addTimeEventListener.js';

function addListenersForBorderColor() {
  // addStrEventListener(inputId, maxByte, isRequired, isTextarea)

  addStrEventListener('event-title', 224, true, false);
  addStrEventListener('event-pic', 56, false, false);
  addStrEventListener('event-location', 224, true, false);
  addStrEventListener('event-topic', 480, true, true);
  addStrEventListener('event-details', 4064, false, true);
  addTimeEventListener();
}

addListenersForBorderColor();
