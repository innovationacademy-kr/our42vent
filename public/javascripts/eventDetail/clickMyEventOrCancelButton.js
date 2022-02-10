import { renderInfo, generateMonth } from '../calendar/month/generateMonth.js';
import api from '../utils/createAxiosInterceptor.js';
import { alertModal } from '../utils/sweetAlertMixin.js';

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

// '이벤트 구독' 클릭 시, my_event insert
myEventButton.addEventListener('click', async () => {
  const notification = document.getElementById('details-notification').value;
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(9);

  api
    .post(`/event/myevent/${eventId}`, { notification })
    .then(res => {
      alertModal
        .fire({ title: '이벤트가 구독되었습니다.', icon: 'success' })
        .then(() => toggleNotification('subscribe'));
    })
    .catch(err => alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' }));
});

// '구독 취소' 클릭 시, my_event delete
cancelButton.addEventListener('click', () => {
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(9);

  api
    .delete(`/event/myevent/${eventId}`)
    .then(res => {
      alertModal
        .fire({ title: '구독이 취소되었습니다.', icon: 'warning' })
        .then(() => toggleNotification('unsubscribe'));
    })
    .catch(err => alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' }));
});
