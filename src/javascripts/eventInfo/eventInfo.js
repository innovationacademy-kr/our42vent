import { setEventDetails } from '../eventDetail/clickEventDetails.js';

async function displayEventInfo() {
  const cookies = document.cookie.match(/eventId=\d*/);
  const eventId = cookies ? cookies[0].replace('eventId=', '') : '';
  document.cookie = 'eventId= ; expires = Thu, 01 Jan 1970 00:00:00 UTC';
  if (eventId !== '') {
    await setEventDetails(eventId);
    const detailsElement = document.querySelector('.layout-details');
    detailsElement.id = `_eventId-${eventId}`;
    detailsElement.style.display = 'grid';
  }
}

displayEventInfo();
