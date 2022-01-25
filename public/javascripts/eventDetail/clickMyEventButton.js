import setNotification from './utils/setNotification.js';

// '내 이벤트로 등록' 클릭시, my_event insert
const myEventButton = document.querySelector('.details-myevent-button');

myEventButton.addEventListener('click', () => {
  const notificationOption = document.getElementById('details-notification').value;
  const notification = setNotification(notificationOption);
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(6);

  axios
    .post(`/event/myevent/${eventId}`, { notification })
    .then(res => {
      detailsElement.style.display = 'none';
    })
    .catch(err => console.log(err.message));
});
