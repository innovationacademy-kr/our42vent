import api from '../utils/createAxiosInterceptor.js';
import { alertModal, confirmModal } from '../utils/sweetAlertMixin.js';

function deleteEvent(event) {
  const eventId = event.target.classList[0]; // class의 이름으로 부터 eventId를 받아옴
  confirmModal.fire({ title: '삭제 하시겠습니까?', icon: 'warning' }).then(result => {
    if (result.isConfirmed) {
      api
        .delete(`/event/${eventId}`)
        .then(() => {
          alertModal
            .fire({ title: '삭제되었습니다!', icon: 'success' })
            .then(() => window.location.replace('/event/list/'));
        })
        .catch(err => {
          if (err.response.status === 405) {
            alertModal
              .fire({ title: '이미 삭제된 이벤트 입니다.', icon: 'error' })
              .then(() => window.location.replace('/event/list'));
          } else {
            alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' });
          }
        });
    }
  });
}

// 삭제 아이콘에 이벤트 할당
export default function clickDelete(eventListSection) {
  const deleteButtonElementArray = eventListSection.querySelectorAll('.list-delete');

  deleteButtonElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', deleteEvent)
  );
}
