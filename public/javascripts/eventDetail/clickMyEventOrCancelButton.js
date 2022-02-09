import { renderInfo, generateMonth } from '../calendar/month/generateMonth.js';

const myEventButton = document.querySelector('.details-myevent-button');
const cancelButton = document.querySelector('.details-cancel-button');
const notificationButtonRow = document.querySelector('.notification-button');

// 알림 버튼 & 정보 display 설정
function toggleNotification(action) {
  const buttonElem =
    action === 'subscribe' ? [myEventButton, cancelButton] : [cancelButton, myEventButton];

  buttonElem[0].style.display = 'none';
  buttonElem[1].style.display = 'block';
  if (window.location.pathname === '/' && sessionStorage.getItem('isMyEvent'))
    renderInfo[0] = generateMonth();

  const beginAtSplit = document
    .querySelector('.details-range')
    .textContent.replace(/[^\d.-]/g, ' ')
    .split(' ')
    .filter(elem => elem !== '');
  const beginAtObj = new Date(
    beginAtSplit[0],
    beginAtSplit[1] - 1,
    beginAtSplit[2],
    beginAtSplit[3],
    beginAtSplit[4]
  );

  if ('serviceWorker' in navigator && 'PushManager' in window && new Date() < beginAtObj) {
    const notificationInfo = document.querySelector('.details-notification-info');
    const notificationSelect = document.querySelector('#details-notification');
    const notificationElem =
      action === 'subscribe'
        ? [notificationSelect, notificationInfo]
        : [notificationInfo, notificationSelect];

    if (action === 'subscribe') {
      const { value } = notificationSelect;
      if (value === 'none') notificationInfo.textContent = '';
      else if (value === '0') notificationInfo.textContent = '이벤트 시작 시간 알림';
      else notificationInfo.textContent = `이벤트 ${value}분 전 알림`;
    }

    notificationElem[0].style.display = 'none';
    notificationElem[1].style.display = 'block';
  } else {
    document.querySelector('#details-notification').style.display = 'none';
    document.querySelector('.details-notification-info').style.display = 'none';
    notificationButtonRow.style.flexDirection = 'row-reverse';
  }
}

// '내 이벤트로 등록' 클릭 시, my_event insert
myEventButton.addEventListener('click', async () => {
  const notification = document.getElementById('details-notification').value;
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(9);

  axios
    .post(`/event/myevent/${eventId}`, { notification })
    .then(() => toggleNotification('subscribe'))
    .catch(err => {
      // TODO : client side 에러핸들링
      console.log(err.message);
    });
});

// '등록 취소' 클릭 시, my_event delete
cancelButton.addEventListener('click', () => {
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(9);

  axios
    .delete(`/event/myevent/${eventId}`)
    .then(() => toggleNotification('unsubscribe'))
    .catch(err => {
      // TODO : client side 에러핸들링
      console.log(err.message);
    });
});
