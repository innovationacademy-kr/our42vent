import { setEventDetails } from '../eventDetail/clickEventDetails.js';

async function displayEventInfo() {
  const eventId = document.cookie.replace('eventId=', '');
  if (eventId !== '') {
    await setEventDetails(eventId);
    document.querySelector('.layout-details').style.display = 'grid';
  }
  document.cookie = 'eventId= ; expires = Thu, 01 Jan 1970 00:00:00 UTC';
}

displayEventInfo();
