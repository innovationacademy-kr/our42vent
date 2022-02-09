import { renderInfo, generateMonth } from '../calendar/month/generateMonth.js';
import api from '../utils/createAxiosInterceptor.js';
import { alertModal } from '../utils/sweetAlertMixin.js';

// '내 이벤트로 등록' 클릭 시, my_event insert
const myEventButton = document.querySelector('.details-myevent-button');

myEventButton.addEventListener('click', () => {
  const notification = document.getElementById('details-notification').value;
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(9);

  api
    .post(`/event/myevent/${eventId}`, { notification })
    .then(res => {
      alertModal.fire({ title: '이벤트에 등록되었습니다.', icon: 'success' }).then(() => {
        detailsElement.style.display = 'none';
      });
    })
    .catch(err => alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' }));
});

// '등록 취소' 클릭 시, my_event delete
const cancelButton = document.querySelector('.details-cancel-button');

cancelButton.addEventListener('click', () => {
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(9);

  api
    .delete(`/event/myevent/${eventId}`)
    .then(res => {
      alertModal.fire({ title: '등록이 취소되었습니다.', icon: 'warning' }).then(() => {
        detailsElement.style.display = 'none';
        if (window.location.pathname === '/') renderInfo[0] = generateMonth();
      });
    })
    .catch(err => alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' }));
});
